<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <h4 class="q-mb-md">LEADERBOARD</h4>

        <!-- Gamer Tag Setup -->
        <q-card v-if="!currentUserGamerTag" class="q-mb-md q-pa-md">
          <div class="text-h6 q-mb-sm">Set Your Gamer Tag</div>
          <div class="text-caption q-mb-md">
            Choose a gamer tag to appear on the leaderboard
          </div>
          <q-input
            v-model="newGamerTag"
            label="Gamer Tag"
            :maxlength="20"
            class="q-mb-md"
            @keyup.enter="saveGamerTag"
          />
          <q-btn @click="saveGamerTag" :disable="!newGamerTag || newGamerTag.length < 2">
            Save
          </q-btn>
        </q-card>

        <!-- Current User Info -->
        <q-card v-else class="q-mb-md q-pa-md">
          <div class="text-body1">
            <strong>Your Gamer Tag:</strong> {{ currentUserGamerTag }}
          </div>
          <div class="text-caption q-mt-sm">
            NPub: {{ currentUserNpub ? currentUserNpub.substring(0, 20) + '...' : 'Not available' }}
          </div>
          <q-btn
            flat
            size="sm"
            @click="showEditGamerTag = true"
            class="q-mt-sm"
          >
            Change Gamer Tag
          </q-btn>
        </q-card>

        <!-- Game Selection -->
        <q-card class="q-mb-md q-pa-md">
          <div class="text-h6 q-mb-sm">Select Game</div>
          <q-btn-toggle
            v-model="selectedGameType"
            :options="gameTypes"
            class="q-mb-md"
          />
        </q-card>

        <!-- Leaderboard -->
        <q-card v-if="selectedGameType" class="q-pa-md">
          <div class="text-h6 q-mb-md">
            {{ getGameName(selectedGameType) }} Leaderboard
          </div>

          <div v-if="leaderboard.length === 0" class="text-center q-pa-lg">
            <div class="text-body1">No scores yet!</div>
            <div class="text-caption q-mt-sm">Be the first to play!</div>
          </div>

          <q-list v-else>
            <q-item
              v-for="(entry, index) in leaderboard"
              :key="entry.npub"
              :class="{ 'bg-primary': entry.npub === currentUserNpub }"
            >
              <q-item-section avatar>
                <div class="text-h6">#{{ index + 1 }}</div>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ entry.gamerTag || entry.npub.substring(0, 16) + '...' }}
                  <q-badge
                    v-if="entry.npub === currentUserNpub"
                    color="accent"
                    class="q-ml-sm"
                  >
                    You
                  </q-badge>
                </q-item-label>
                <q-item-label caption>
                  Best: {{ formatScore(entry.bestScore, selectedGameType) }} | 
                  Games: {{ entry.gamesPlayed }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <!-- User's Rank -->
          <div v-if="userRank" class="q-mt-md q-pa-md bg-info">
            <div class="text-body1">
              <strong>Your Rank:</strong> #{{ userRank }}
            </div>
            <div class="text-caption q-mt-sm">
              Your Best: {{ formatScore(userBestScore, selectedGameType) }}
            </div>
          </div>
        </q-card>

        <!-- Edit Gamer Tag Dialog -->
        <q-dialog v-model="showEditGamerTag">
          <q-card class="q-pa-md" style="min-width: 300px">
            <q-card-section>
              <div class="text-h6">Change Gamer Tag</div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="newGamerTag"
                label="Gamer Tag"
                :maxlength="20"
                class="q-mb-md"
                @keyup.enter="saveGamerTag"
              />
            </q-card-section>
            <q-card-actions>
              <q-btn flat @click="showEditGamerTag = false">Cancel</q-btn>
              <q-btn
                @click="saveGamerTag"
                :disable="!newGamerTag || newGamerTag.length < 2"
              >
                Save
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { useLeaderboardStore } from "src/stores/leaderboard";
import { useNostrStore } from "src/stores/nostr";

export default defineComponent({
  name: "LeaderboardPage",
  setup() {
    const leaderboardStore = useLeaderboardStore();
    const selectedGameType = ref<string | null>("reaction-time");
    const newGamerTag = ref("");
    const showEditGamerTag = ref(false);

    const gameTypes = [
      { label: "Reaction Time", value: "reaction-time" },
      { label: "Number Guess", value: "number-guess" },
    ];

    const currentUserNpub = computed(() => leaderboardStore.currentUserNpub);
    const currentUserGamerTag = computed(() => leaderboardStore.currentUserGamerTag);

    const leaderboard = computed(() => {
      if (!selectedGameType.value) return [];
      return leaderboardStore.getLeaderboard(selectedGameType.value, 20);
    });

    const userRank = computed(() => {
      if (!selectedGameType.value) return null;
      return leaderboardStore.getUserRank(selectedGameType.value);
    });

    const userBestScore = computed(() => {
      if (!selectedGameType.value) return null;
      return leaderboardStore.getUserBestScore(selectedGameType.value);
    });

    const getGameName = (gameType: string) => {
      const names: Record<string, string> = {
        "reaction-time": "Reaction Time",
        "number-guess": "Number Guess",
      };
      return names[gameType] || gameType;
    };

    const formatScore = (score: number | null, gameType: string): string => {
      if (score === null) return "N/A";
      
      if (gameType === "reaction-time") {
        // Score is 10000 - reactionTime, so convert back
        const reactionTime = 10000 - score;
        return `${reactionTime}ms`;
      } else if (gameType === "number-guess") {
        // Score is 100 - attempts, so convert back
        const attempts = 100 - score;
        return `${attempts} attempts`;
      }
      
      return score.toString();
    };

    const saveGamerTag = () => {
      if (!newGamerTag.value || newGamerTag.value.length < 2) return;
      
      try {
        leaderboardStore.setGamerTag(newGamerTag.value);
        showEditGamerTag.value = false;
        newGamerTag.value = "";
      } catch (error: any) {
        console.error("Error setting gamer tag:", error);
      }
    };

    // Initialize gamer tag input if user has one
    watch(currentUserGamerTag, (tag) => {
      if (tag) {
        newGamerTag.value = tag;
      }
    }, { immediate: true });

    // Ensure Nostr is initialized
    onMounted(async () => {
      const nostrStore = useNostrStore();
      if (!nostrStore.initialized) {
        try {
          await nostrStore.initSignerIfNotSet();
        } catch (error) {
          console.error("Error initializing Nostr:", error);
        }
      }
    });

    return {
      selectedGameType,
      newGamerTag,
      showEditGamerTag,
      gameTypes,
      currentUserNpub,
      currentUserGamerTag,
      leaderboard,
      userRank,
      userBestScore,
      getGameName,
      formatScore,
      saveGamerTag,
    };
  },
});
</script>

