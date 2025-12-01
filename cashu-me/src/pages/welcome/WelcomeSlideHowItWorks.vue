<!-- src/pages/welcome/WelcomeSlideHowItWorks.vue -->
<template>
  <div class="how-it-works-slide">
    <!-- Main content area -->
    <div class="content">
      <!-- Title -->
      <h1 class="title">{{ $t("WelcomeSlideHowItWorks.title") }}</h1>

      <!-- Description -->
      <p class="description">{{ $t("WelcomeSlideHowItWorks.description") }}</p>

      <!-- How it works steps -->
      <div class="steps-container">
        <div class="step-item">
          <div class="step-icon-wrapper">
            <q-icon name="phone_android" size="2em" class="step-icon" />
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ $t("WelcomeSlideHowItWorks.step1.title") }}</h3>
            <p class="step-text">{{ $t("WelcomeSlideHowItWorks.step1.text") }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-icon-wrapper">
            <q-icon name="vpn_key" size="2em" class="step-icon" />
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ $t("WelcomeSlideHowItWorks.step2.title") }}</h3>
            <p class="step-text">{{ $t("WelcomeSlideHowItWorks.step2.text") }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-icon-wrapper">
            <q-icon name="account_balance_wallet" size="2em" class="step-icon" />
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ $t("WelcomeSlideHowItWorks.step3.title") }}</h3>
            <p class="step-text">{{ $t("WelcomeSlideHowItWorks.step3.text") }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-icon-wrapper">
            <q-icon name="school" size="2em" class="step-icon" />
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ $t("WelcomeSlideHowItWorks.step4.title") }}</h3>
            <p class="step-text">{{ $t("WelcomeSlideHowItWorks.step4.text") }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer to match other slides -->
    <div class="spacer"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "WelcomeSlideHowItWorks",
};
</script>

<style scoped>
.how-it-works-slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: var(--q-dark);
  color: white;
  padding: 40px 20px 20px 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: white;
  line-height: 1.2;
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 30px 0;
  max-width: 500px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  text-align: left;
}

.step-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.step-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--q-primary-rgb), 0.2);
  border-radius: 12px;
}

.step-icon {
  color: var(--q-primary);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
}

.step-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.spacer {
  height: 76px;
  flex-shrink: 0;
}

/* Mobile adjustments */
@media (max-width: 600px) {
  .how-it-works-slide {
    padding: 30px 15px 15px 15px;
  }

  .title {
    font-size: 1.7rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .step-item {
    padding: 12px;
    gap: 12px;
  }

  .step-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .step-title {
    font-size: 1rem;
  }

  .step-text {
    font-size: 0.9rem;
  }
}
</style>

