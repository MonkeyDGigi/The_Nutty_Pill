<template>
  <q-page class="q-pa-md">
    <!-- Password Protection -->
    <div v-if="!isAuthenticated">
      <q-card class="q-pa-md" style="max-width: 400px; margin: 0 auto;">
        <q-card-section>
          <div class="text-h6 q-mb-md">Admin Access</div>
          <div v-if="!hasPassword">
            <div class="text-body2 q-mb-md">
              Set up a password to protect admin controls.
            </div>
            <q-input
              v-model="newPassword"
              type="password"
              label="Create Password"
              class="q-mb-md"
              @keyup.enter="setupPassword"
            />
            <q-input
              v-model="confirmPassword"
              type="password"
              label="Confirm Password"
              class="q-mb-md"
              @keyup.enter="setupPassword"
            />
            <q-btn
              @click="setupPassword"
              :disable="!newPassword || newPassword !== confirmPassword || newPassword.length < 4"
              class="full-width"
              color="primary"
            >
              Set Password
            </q-btn>
          </div>
          <div v-else>
            <q-input
              v-model="password"
              type="password"
              label="Enter Password"
              class="q-mb-md"
              @keyup.enter="authenticate"
              :error="passwordError"
              error-message="Incorrect password"
            />
            <q-btn
              @click="authenticate"
              :disable="!password"
              :loading="authenticating"
              class="full-width"
              color="primary"
            >
              Enter
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Main Dashboard (Password Protected) -->
    <div v-else>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h4">Admin Dashboard</div>
        <q-btn
          flat
          icon="lock"
          label="Lock"
          @click="lockDashboard"
          color="grey"
        />
      </div>
      
      <!-- Balance Info -->
      <q-card class="q-mb-md q-pa-md">
        <div class="text-h6 q-mb-sm">Wallet Balance</div>
        <div class="text-body1 q-mb-sm">
          <strong>Total:</strong> {{ totalWalletBalance }} sats
          <div class="text-caption">(Locked + Unlocked)</div>
        </div>
        <div class="text-body2 q-mt-md q-pa-sm" style="background: rgba(157, 78, 221, 0.1); border-radius: 4px;">
          <strong>Available:</strong> {{ totalUnlockedSats }} sats
          <div class="text-caption">Can be spent/sent</div>
        </div>
        <div class="text-body2 q-mt-sm q-pa-sm" style="background: rgba(255, 152, 0, 0.1); border-radius: 4px;">
          <strong>Locked:</strong> {{ totalLockedSats }} sats
          <div class="text-caption">Must be earned by completing lessons (100% score required)</div>
        </div>
      </q-card>

      <!-- Total Reward Pool Management -->
      <q-card class="q-mb-md q-pa-md">
        <div class="text-h6 q-mb-sm">Set Total Reward Pool</div>
        <div class="text-caption q-mb-md">
          Set the total amount of sats to be distributed across all lessons. 
          Rewards increase with lesson difficulty and lesson number - advanced lessons and later lessons earn more.
        </div>
        
        <div class="row items-center q-gutter-md">
          <q-input
            v-model.number="totalRewardPool"
            type="number"
            label="Total Reward Pool (sats)"
            :min="0"
            :max="totalWalletBalance"
            class="col"
            @update:model-value="updateTotalRewardPool"
          />
          <div class="col-auto">
            <q-btn
              @click="updateTotalRewardPool(totalRewardPool)"
              :disable="totalRewardPool < 0 || totalRewardPool > totalWalletBalance"
              color="primary"
            >
              Set Pool
            </q-btn>
          </div>
        </div>
        
        <div v-if="rewardPerLesson > 0" class="q-mt-md q-pa-sm" style="background: rgba(157, 78, 221, 0.1); border-radius: 4px;">
          <div class="text-body2">
            <strong>Average reward per lesson:</strong> {{ rewardPerLesson }} sats
          </div>
          <div class="text-caption">
            Rewards increase with lesson difficulty and lesson number. Advanced lessons and later lessons earn more.
          </div>
          <div class="text-caption q-mt-xs">
            <strong>Example:</strong> Beginner lesson 1 ≈ {{ getExampleReward('beginner', 1) }} sats, 
            Advanced lesson 12 ≈ {{ getExampleReward('advanced', 12) }} sats
          </div>
        </div>
      </q-card>

      <!-- Progress Overview -->
      <q-card class="q-mb-md q-pa-md">
        <div class="text-h6 q-mb-sm">Learning Progress</div>
        
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <div class="text-body2">📜 Bitcoin History</div>
            <div class="text-caption">
              {{ historyProgress.completed }} / {{ historyProgress.total }} lessons
            </div>
            <q-linear-progress
              :value="historyProgress.percentage"
              color="primary"
              class="q-mt-sm"
            />
          </div>
          
          <div class="col-12 col-md-3">
            <div class="text-body2">🔐 Self-Custody</div>
            <div class="text-caption">
              {{ selfCustodyProgress.completed }} / {{ selfCustodyProgress.total }} lessons
            </div>
            <q-linear-progress
              :value="selfCustodyProgress.percentage"
              color="primary"
              class="q-mt-sm"
            />
          </div>
          
          <div class="col-12 col-md-3">
            <div class="text-body2">🔗 Protocols</div>
            <div class="text-caption">
              {{ protocolsProgress.completed }} / {{ protocolsProgress.total }} lessons
            </div>
            <q-linear-progress
              :value="protocolsProgress.percentage"
              color="primary"
              class="q-mt-sm"
            />
          </div>
          
          <div class="col-12 col-md-3">
            <div class="text-body2">📈 Economics</div>
            <div class="text-caption">
              {{ economicsProgress.completed }} / {{ economicsProgress.total }} lessons
            </div>
            <q-linear-progress
              :value="economicsProgress.percentage"
              color="primary"
              class="q-mt-sm"
            />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useEducationStore } from "src/stores/education";
import { useMintsStore } from "src/stores/mints";
import { date } from "quasar";

export default defineComponent({
  name: "ParentDashboard",
  setup() {
    const educationStore = useEducationStore();
    const mintsStore = useMintsStore();
    const isAuthenticated = ref(false);
    const password = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const passwordError = ref(false);
    const authenticating = ref(false);
    const totalRewardPool = ref<number>(0);

    const hasPassword = computed(() => {
      return !!educationStore.parentPasswordHash;
    });

    const allLessons = computed(() => {
      // Only show Bitcoin-related lessons (history, self-custody, protocols, economics)
      const bitcoinSubjects = ["history", "self-custody", "protocols", "economics"];
      const bitcoinLessons = educationStore.lessons.filter(lesson => 
        bitcoinSubjects.includes(lesson.subject)
      );
      
      // Sort by subject, then by numeric lesson number
      return bitcoinLessons.sort((a, b) => {
        // First sort by subject order
        const subjectOrder = { history: 0, "self-custody": 1, protocols: 2, economics: 3 };
        const subjectDiff = (subjectOrder[a.subject as keyof typeof subjectOrder] || 999) - 
                           (subjectOrder[b.subject as keyof typeof subjectOrder] || 999);
        if (subjectDiff !== 0) return subjectDiff;
        
        // Then sort by numeric lesson number
        const aNum = parseInt(a.id.split("-").pop() || "0");
        const bNum = parseInt(b.id.split("-").pop() || "0");
        return aNum - bNum;
      });
    });
    
    const getLessonNumber = (lessonId: string): number => {
      const num = parseInt(lessonId.split("-").pop() || "0");
      return num;
    };

    const totalWalletBalance = computed(() => {
      return educationStore.totalWalletBalance;
    });

    const totalLockedSats = computed(() => {
      return educationStore.totalLockedSats;
    });

    const totalUnlockedSats = computed(() => {
      return educationStore.totalUnlockedSats;
    });

    const rewardPerLesson = computed(() => {
      return educationStore.rewardPerLesson;
    });

    const totalLessons = computed(() => {
      return allLessons.value.length;
    });

    const getRewardForLesson = (lessonId: string) => {
      return educationStore.getRewardForLesson(lessonId);
    };

    const getExampleReward = (difficulty: string, lessonNum: number) => {
      // Find a lesson with similar difficulty and number to show example
      const exampleLesson = allLessons.value.find((l) => {
        const match = l.id.match(/-(\d+)$/);
        const num = match ? parseInt(match[1], 10) : 0;
        return l.difficulty === difficulty && Math.abs(num - lessonNum) <= 2;
      });
      if (exampleLesson) {
        return getRewardForLesson(exampleLesson.id);
      }
      // Fallback calculation
      const difficultyWeight = difficulty === "beginner" ? 1 : difficulty === "intermediate" ? 2 : 3;
      const weight = (lessonNum * 1.5) + (difficultyWeight * 2);
      // Rough estimate based on average
      return Math.floor((weight / 100) * totalRewardPool.value * 0.1);
    };

    const historyProgress = computed(() => {
      const lessons = educationStore.getLessonsBySubject("history");
      const completed = lessons.filter((l) => l.completed).length;
      return {
        total: lessons.length,
        completed,
        percentage: lessons.length > 0 ? completed / lessons.length : 0,
      };
    });

    const selfCustodyProgress = computed(() => {
      const lessons = educationStore.getLessonsBySubject("self-custody");
      const completed = lessons.filter((l) => l.completed).length;
      return {
        total: lessons.length,
        completed,
        percentage: lessons.length > 0 ? completed / lessons.length : 0,
      };
    });

    const protocolsProgress = computed(() => {
      const lessons = educationStore.getLessonsBySubject("protocols");
      const completed = lessons.filter((l) => l.completed).length;
      return {
        total: lessons.length,
        completed,
        percentage: lessons.length > 0 ? completed / lessons.length : 0,
      };
    });

    const economicsProgress = computed(() => {
      const lessons = educationStore.getLessonsBySubject("economics");
      const completed = lessons.filter((l) => l.completed).length;
      return {
        total: lessons.length,
        completed,
        percentage: lessons.length > 0 ? completed / lessons.length : 0,
      };
    });

    const setupPassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        return;
      }
      if (newPassword.value.length < 4) {
        return;
      }
      
      await educationStore.setParentPassword(newPassword.value);
      newPassword.value = "";
      confirmPassword.value = "";
      isAuthenticated.value = true;
    };

    const authenticate = async () => {
      authenticating.value = true;
      passwordError.value = false;
      
      try {
        const valid = await educationStore.verifyPassword(password.value);
        if (valid) {
          isAuthenticated.value = true;
          password.value = "";
          totalRewardPool.value = educationStore.totalRewardPool;
        } else {
          passwordError.value = true;
        }
      } catch (error) {
        console.error("Error authenticating:", error);
        passwordError.value = true;
      } finally {
        authenticating.value = false;
      }
    };

    const lockDashboard = () => {
      isAuthenticated.value = false;
      password.value = "";
    };

    const updateTotalRewardPool = (amount: number) => {
      if (amount !== null && amount >= 0 && amount <= totalWalletBalance.value) {
        educationStore.setTotalRewardPool(amount);
        totalRewardPool.value = amount;
      }
    };

    const getSubjectName = (subject: string) => {
      const names: Record<string, string> = {
        history: "Bitcoin History",
        "self-custody": "Self-Custody",
        protocols: "Protocols",
        economics: "Economics",
      };
      return names[subject] || subject;
    };

    // Check if already authenticated (session persists until page reload)
    onMounted(async () => {
      if (!hasPassword.value) {
        // No password set yet, show setup
        return;
      }
      // Password exists, require authentication
    });

    return {
      isAuthenticated,
      hasPassword,
      password,
      newPassword,
      confirmPassword,
      passwordError,
      authenticating,
      totalRewardPool,
      rewardPerLesson,
      totalLessons,
      allLessons,
      totalWalletBalance,
      totalLockedSats,
      totalUnlockedSats,
      historyProgress,
      selfCustodyProgress,
      protocolsProgress,
      economicsProgress,
      getLessonNumber,
      setupPassword,
      authenticate,
      lockDashboard,
      updateTotalRewardPool,
      getSubjectName,
      getRewardForLesson,
      getExampleReward,
    };
  },
});
</script>

<style scoped>
</style>
