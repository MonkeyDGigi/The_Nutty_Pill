<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-mb-md">Reaction Time</div>
      <div class="text-caption q-mb-md">
        Click when the screen turns green!
      </div>
    </q-card-section>

    <q-card-section class="text-center">
      <div
        :class="['reaction-box', { 'waiting': waiting, 'ready': ready, 'too-early': tooEarly }]"
        @click="handleClick"
      >
        <div v-if="waiting" class="text-h5">Wait...</div>
        <div v-else-if="ready" class="text-h5">CLICK NOW!</div>
        <div v-else-if="tooEarly" class="text-h5">Too Early!</div>
        <div v-else-if="result" class="text-h4 q-mt-md">
          {{ result }}ms
        </div>
        <div v-else class="text-h5">Click to Start</div>
      </div>

      <div v-if="bestScore" class="q-mt-md text-caption">
        Your Best: {{ bestScore }}ms
      </div>

      <q-btn
        v-if="!waiting && !ready && result !== null"
        @click="startGame"
        class="q-mt-md"
      >
        Play Again
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useLeaderboardStore } from "src/stores/leaderboard";

export default defineComponent({
  name: "ReactionTimeGame",
  setup() {
    const leaderboardStore = useLeaderboardStore();
    const waiting = ref(false);
    const ready = ref(false);
    const tooEarly = ref(false);
    const result = ref<number | null>(null);
    const startTime = ref<number | null>(null);
    const clickTime = ref<number | null>(null);

    const bestScore = computed(() => {
      const score = leaderboardStore.getUserBestScore("reaction-time");
      if (score === null) return null;
      // Convert score back to reaction time (score = 10000 - reactionTime)
      return 10000 - score;
    });

    const startGame = () => {
      waiting.value = true;
      ready.value = false;
      tooEarly.value = false;
      result.value = null;
      startTime.value = null;
      clickTime.value = null;

      // Random delay between 2-5 seconds
      const delay = 2000 + Math.random() * 3000;
      
      setTimeout(() => {
        if (waiting.value) {
          waiting.value = false;
          ready.value = true;
          startTime.value = Date.now();
        }
      }, delay);
    };

    const handleClick = () => {
      if (waiting.value) {
        // Clicked too early
        waiting.value = false;
        tooEarly.value = true;
        ready.value = false;
        setTimeout(() => {
          tooEarly.value = false;
        }, 2000);
        return;
      }

      if (ready.value && startTime.value) {
        clickTime.value = Date.now();
        const reactionTime = clickTime.value - startTime.value;
        result.value = reactionTime;
        ready.value = false;

        // Submit score (lower is better, so we'll use negative for leaderboard)
        // Actually, let's make higher scores better by using 10000 - reactionTime
        const score = Math.max(0, 10000 - reactionTime);
        leaderboardStore.submitScore("reaction-time", score, {
          reactionTime,
        }).catch(error => {
          console.error("Error submitting score:", error);
        });
      } else if (!result.value && !waiting.value && !tooEarly.value) {
        // Initial click to start
        startGame();
      }
    };

    return {
      waiting,
      ready,
      tooEarly,
      result,
      bestScore,
      startGame,
      handleClick,
    };
  },
});
</script>

<style scoped>
.reaction-box {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 16px;
  background: #1A0D2E;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.reaction-box.waiting {
  background: #4A148C;
  border-color: rgba(157, 78, 221, 0.5);
}

.reaction-box.ready {
  background: #9D4EDD;
  border-color: #9D4EDD;
  box-shadow: 0 4px 16px rgba(157, 78, 221, 0.4);
}

.reaction-box.too-early {
  background: #D03000;
  border-color: #D03000;
}
</style>

