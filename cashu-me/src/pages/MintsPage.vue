<template>
  <q-page class="q-pa-md">
    <!-- Password Protection -->
    <div v-if="!isAuthenticated" class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <q-card class="q-pa-md" style="max-width: 400px; margin: 0 auto;">
          <q-card-section>
            <div class="text-h6 q-mb-md">Parent Access Required</div>
            <div v-if="!hasPassword">
              <div class="text-body2 q-mb-md">
                Set up a password to access mint settings.
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
                :error="!!passwordError"
                error-message="Incorrect password"
              />
              <q-btn
                @click="authenticate"
                :disable="!password"
                :loading="authenticating"
                class="full-width"
                color="primary"
              >
                Access Mint Settings
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <h4 class="q-mb-md">{{ $t("WalletPage.tabs.mints.label") }}</h4>
        <MintSettings />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import MintSettings from "components/MintSettings.vue";
import { useEducationStore } from "src/stores/education";

export default defineComponent({
  name: "MintsPage",
  components: {
    MintSettings,
  },
  setup() {
    const educationStore = useEducationStore();
    const password = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const passwordError = ref("");
    const isAuthenticated = ref(false);
    const authenticating = ref(false);

    const hasPassword = computed(() => !!educationStore.parentPasswordHash);

    const setupPassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        passwordError.value = "Passwords do not match";
        return;
      }
      if (newPassword.value.length < 4) {
        passwordError.value = "Password must be at least 4 characters";
        return;
      }
      await educationStore.setParentPassword(newPassword.value);
      isAuthenticated.value = true;
      newPassword.value = "";
      confirmPassword.value = "";
      passwordError.value = "";
    };

    const authenticate = async () => {
      authenticating.value = true;
      passwordError.value = "";
      const valid = await educationStore.verifyPassword(password.value);
      if (valid) {
        isAuthenticated.value = true;
        password.value = "";
      } else {
        passwordError.value = "Incorrect password";
      }
      authenticating.value = false;
    };

    // Check if already authenticated in this session (optional - you can remove this if you want password required every time)
    onMounted(() => {
      // For now, require password every time
      isAuthenticated.value = false;
    });

    return {
      password,
      newPassword,
      confirmPassword,
      passwordError,
      isAuthenticated,
      authenticating,
      hasPassword,
      setupPassword,
      authenticate,
    };
  },
});
</script>

