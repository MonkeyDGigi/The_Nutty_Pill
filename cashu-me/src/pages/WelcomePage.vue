<!-- src/pages/WelcomePage.vue -->
<template>
  <div class="welcome-page" @drop.prevent="dragFile" @dragover.prevent>
    <q-card class="q-pa-none welcome-card">
      <q-carousel
        v-model="currentSlide"
        animated
        control-color="primary"
        class="flex-1 welcome-carousel"
      >
        <q-carousel-slide :name="0">
          <WelcomeSlide1 />
        </q-carousel-slide>
        <q-carousel-slide :name="1">
          <WelcomeSlideHowItWorks />
        </q-carousel-slide>
        <q-carousel-slide :name="2">
          <WelcomeSlide2 />
        </q-carousel-slide>
        <q-carousel-slide :name="3">
          <WelcomeSlideChoice />
        </q-carousel-slide>
        <!-- New wallet flow: seed display at slide 4 -->
        <q-carousel-slide
          :name="4"
          v-if="welcomeStore.onboardingPath === 'new'"
        >
          <WelcomeSlide3 />
        </q-carousel-slide>
        <!-- Recover flow: seed input at slide 4 -->
        <q-carousel-slide
          :name="4"
          v-else-if="welcomeStore.onboardingPath === 'recover'"
        >
          <WelcomeRecoverSeed />
        </q-carousel-slide>
        <!-- Mints setup at slide 5 (both paths) -->
        <q-carousel-slide :name="5" v-if="welcomeStore.onboardingPath">
          <WelcomeMintSetup />
        </q-carousel-slide>
        <!-- Recover flow: restore ecash at slide 6 -->
        <q-carousel-slide
          :name="6"
          v-if="welcomeStore.onboardingPath === 'recover'"
        >
          <WelcomeRestoreEcash />
        </q-carousel-slide>
      </q-carousel>

      <div
        class="q-pa-md flex justify-between welcome-navigation"
        v-if="currentSlide > 0"
        style="padding-bottom: calc(16px + env(safe-area-inset-bottom));"
      >
        <q-btn
          flat
          icon="arrow_left"
          :label="$t('WelcomePage.actions.previous.label')"
          v-if="canGoPrev"
          @click="goToPrevSlide"
        />
        <!-- language selector (hidden on first slide since it's now in the slide itself) -->
        <div
          class="q-ml-md"
          v-if="!canGoPrev && currentSlide > 0"
          style="position: relative; top: -5px"
        >
          <q-select
            v-model="selectedLanguage"
            :options="languageOptions"
            emit-value
            dense
            map-options
            @update:model-value="changeLanguage"
            style="max-width: 200px; max-height: 20px"
          />
        </div>
        <q-space />
        <q-btn
          flat
          icon="arrow_right"
          :label="$t('WelcomePage.actions.next.label')"
          :disable="!canProceed"
          @click="goToNextSlide"
          v-if="currentSlide > 0 && currentSlide !== 3"
        />
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useWelcomeStore } from "src/stores/welcome";
import { useStorageStore } from "src/stores/storage";
import WelcomeSlide1 from "./welcome/WelcomeSlide1.vue";
import WelcomeSlideHowItWorks from "./welcome/WelcomeSlideHowItWorks.vue";
import WelcomeSlide2 from "./welcome/WelcomeSlide2.vue";
import WelcomeSlide3 from "./welcome/WelcomeSlide3.vue";
import WelcomeSlideChoice from "./welcome/WelcomeSlideChoice.vue";
import WelcomeRecoverSeed from "./welcome/WelcomeRecoverSeed.vue";
import WelcomeMintSetup from "./welcome/WelcomeMintSetup.vue";
import WelcomeRestoreEcash from "./welcome/WelcomeRestoreEcash.vue";

export default {
  name: "WelcomePage",
  components: {
    WelcomeSlide1,
    WelcomeSlideHowItWorks,
    WelcomeSlide2,
    WelcomeSlide3,
    WelcomeSlideChoice,
    WelcomeRecoverSeed,
    WelcomeMintSetup,
    WelcomeRestoreEcash,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const welcomeStore = useWelcomeStore();
    const storageStore = useStorageStore();
    const fileUpload = ref(null);
    
    // Get current slide from route param or default to 0
    const getStepFromRoute = () => {
      const stepParam = route.params.step;
      const stepStr = Array.isArray(stepParam) ? stepParam[0] : stepParam;
      return parseInt(stepStr || '0') || 0;
    };
    const currentSlide = ref(getStepFromRoute());
    
    // Sync route param with local state and store
    watch(() => route.params.step, (newStep) => {
      // Don't sync if we're navigating away from welcome
      if (!route.path.startsWith('/welcome')) return;
      
      const stepStr = Array.isArray(newStep) ? newStep[0] : newStep;
      const step = parseInt(stepStr || '0') || 0;
      if (step !== currentSlide.value && welcomeStore.showWelcome) {
        currentSlide.value = step;
        welcomeStore.setCurrentSlide(step);
      }
    }, { immediate: true });
    
    // Sync store changes to route (when other components update the store)
    // But only if we're still on a welcome route and welcome is still active
    watch(() => welcomeStore.currentSlide, (newSlide) => {
      if (route.path.startsWith('/welcome') && welcomeStore.showWelcome && newSlide !== currentSlide.value) {
        currentSlide.value = newSlide;
        const step = newSlide.toString();
        const currentStep = Array.isArray(route.params.step) ? route.params.step[0] : route.params.step;
        if (currentStep !== step) {
          // Use replace for internal navigation to avoid browser UI appearing
          router.replace({ name: step === '0' ? 'welcome' : 'welcome-step', params: { step } }).catch(() => {
            // Ignore navigation errors
          });
        }
      }
    });
    
    // Sync local slide changes to route
    watch(currentSlide, (newSlide) => {
      // Don't update route if we're completing the welcome (navigating away)
      if (welcomeStore.showWelcome === false) return;
      
      const step = newSlide.toString();
      const currentStep = Array.isArray(route.params.step) ? route.params.step[0] : route.params.step;
      if (currentStep !== step) {
        // Use replace for internal navigation to avoid browser UI issues
        router.replace({ name: step === '0' ? 'welcome' : 'welcome-step', params: { step } }).catch(() => {
          // Ignore navigation errors
        });
      }
      welcomeStore.setCurrentSlide(newSlide);
    });

    const onChangeFileUpload = () => {
      const input = fileUpload.value as HTMLInputElement | null;
      const file = input?.files?.[0];
      if (file) readFile(file);
    };

    const readFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (f: ProgressEvent<FileReader>) => {
        if (f.target?.result && typeof f.target.result === 'string') {
          const backup = JSON.parse(f.target.result);
          storageStore.restoreFromBackup(backup);
        }
      };
      reader.readAsText(file);
    };

    const dragFile = (ev: DragEvent) => {
      const file = ev.dataTransfer?.files?.[0];
      if (file) readFile(file);
    };
    
    const goToPrevSlide = () => {
      if (currentSlide.value > 0) {
        currentSlide.value -= 1;
      }
    };
    
    const goToNextSlide = () => {
      if (!canProceed.value) return;
      
      if (isLastSlide.value) {
        // Complete welcome flow - mark as complete first
        welcomeStore.showWelcome = false;
        // Don't reset currentSlide here to avoid triggering route updates
        // Navigate to home page using replace to avoid back button issues
        router.replace('/').then(() => {
          // Reset slide state after navigation completes
          welcomeStore.currentSlide = 0;
        }).catch(() => {
          // If navigation fails, force reload
          window.location.href = '/';
        });
      } else {
        // Move to next slide
        const nextSlide = currentSlide.value + 1;
        currentSlide.value = nextSlide;
      }
    };
    
    const canGoPrev = computed(() => currentSlide.value > 0);
    const canProceed = computed(() => {
      // 0 Intro
      if (currentSlide.value === 0) return true;
      // 1 How It Works
      if (currentSlide.value === 1) return true;
      // 2 PWA
      if (currentSlide.value === 2) return true;
      // 3 Choice
      if (currentSlide.value === 3) return welcomeStore.onboardingPath !== "";
      // 4 (seed phrase for both paths)
      if (currentSlide.value === 4) {
        if (welcomeStore.onboardingPath === "new") return welcomeStore.seedPhraseValidated;
        if (welcomeStore.onboardingPath === "recover") return welcomeStore.seedEnteredValid;
      }
      // 5 (mints setup for both paths - last step for "new" path)
      if (currentSlide.value === 5) return welcomeStore.mintSetupCompleted || true;
      // 6 (restore step for recover path - last step for "recover" path)
      if (currentSlide.value === 6) {
        if (welcomeStore.onboardingPath === "recover")
          return welcomeStore.ecashRestoreCompleted || true;
      }
      return false;
    });
    
    const isLastSlide = computed(() => {
      // Check if we're on the last slide based on the onboarding path
      if (welcomeStore.onboardingPath === "recover") {
        return currentSlide.value === 6;
      }
      if (welcomeStore.onboardingPath === "new") {
        return currentSlide.value === 5;
      }
      // If no path selected yet, we're not on last slide
      return false;
    });

    onMounted(() => {
      welcomeStore.checkWalletAndUpdateWelcome();
      // Initialize slide from route
      const step = getStepFromRoute();
      currentSlide.value = step;
      welcomeStore.setCurrentSlide(step);
    });

    return {
      welcomeStore,
      currentSlide,
      fileUpload,
      onChangeFileUpload,
      dragFile,
      goToPrevSlide,
      goToNextSlide,
      canGoPrev,
      canProceed,
      isLastSlide,
    };
  },
  data() {
    return {
      selectedLanguage: "",
      languageOptions: [
        { label: "English", value: "en-US" },
        { label: "Español", value: "es-ES" },
        { label: "Italiano", value: "it-IT" },
        { label: "Deutsch", value: "de-DE" },
        { label: "Français", value: "fr-FR" },
        { label: "Svenska", value: "sv-SE" },
        { label: "Ελληνικά", value: "el-GR" },
        { label: "Türkçe", value: "tr-TR" },
        { label: "ไทย", value: "th-TH" },
        { label: "العربية", value: "ar-SA" },
        { label: "中文", value: "zh-CN" },
        { label: "日本語", value: "ja-JP" },
      ],
    };
  },
  methods: {
    changeLanguage(locale: string) {
      // Set the i18n locale
      this.$i18n.locale = locale;

      // Store the selected language in localStorage
      localStorage.setItem("cashu.language", locale);
    },
  },
  created() {
    // Set the initial selected language based on the current locale or from storage
    this.selectedLanguage =
      this.languageOptions.find(
        (option) => option.value === this.$i18n.locale || navigator.language
      )?.label || "Language";
  },
};
</script>

<style scoped>
.welcome-page {
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  background: var(--q-dark);
}

.welcome-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  background: transparent;
}

.welcome-carousel {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 0; /* Allow flex item to shrink */
}

.welcome-navigation {
  flex-shrink: 0; /* Prevent navigation from shrinking */
  min-height: 60px; /* Ensure minimum height for buttons */
  z-index: 10; /* Ensure navigation is above content */
  position: relative;
}

.custom-navigation {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}
</style>
