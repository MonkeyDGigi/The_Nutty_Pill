<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-mb-md">Number Guess</div>
      <div class="text-caption q-mb-md">
        Guess the number between 1 and 100!
      </div>
    </q-card-section>

    <q-card-section>
      <div v-if="gameStarted && !gameOver" class="q-mb-md">
        <div class="text-body1 q-mb-sm">Attempts: {{ attempts }}</div>
        <div v-if="lastHint" class="text-body2 q-mb-md" :class="hintClass">
          {{ lastHint }}
        </div>
      </div>

      <div v-if="gameOver" class="text-center q-mb-md">
        <div class="text-h5 q-mb-sm">You got it!</div>
        <div class="text-body1">It took you {{ attempts }} attempts</div>
        <div v-if="bestScore" class="text-caption q-mt-sm">
          Your Best: {{ bestScore }} attempts
        </div>
      </div>

      <q-input
        v-model.number="guess"
        type="number"
        label="Your Guess"
        :min="1"
        :max="100"
        :disable="gameOver"
        @keyup.enter="makeGuess"
        class="q-mb-md"
      />

      <div class="row q-gutter-sm">
        <q-btn
          v-if="!gameStarted"
          @click="startGame"
          class="col"
        >
          Start Game
        </q-btn>
        <q-btn
          v-else-if="!gameOver"
          @click="makeGuess"
          :disable="!guess || guess < 1 || guess > 100"
          class="col"
        >
          Guess
        </q-btn>
        <q-btn
          v-else
          @click="startGame"
          class="col"
        >
          Play Again
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useLeaderboardStore } from "src/stores/leaderboard";

export default defineComponent({
  name: "NumberGuessGame",
  setup() {
    const leaderboardStore = useLeaderboardStore();
    const gameStarted = ref(false);
    const gameOver = ref(false);
    const targetNumber = ref<number | null>(null);
    const guess = ref<number | null>(null);
    const attempts = ref(0);
    const lastHint = ref<string>("");

    const bestScore = computed(() => {
      const best = leaderboardStore.getUserBestScore("number-guess");
      return best ? Math.max(0, 100 - best) : null; // Convert score back to attempts
    });

    const hintClass = computed(() => {
      if (lastHint.value.includes("higher")) return "text-positive";
      if (lastHint.value.includes("lower")) return "text-negative";
      return "";
    });

    const startGame = () => {
      gameStarted.value = true;
      gameOver.value = false;
      targetNumber.value = Math.floor(Math.random() * 100) + 1;
      guess.value = null;
      attempts.value = 0;
      lastHint.value = "";
    };

    const makeGuess = () => {
      if (!targetNumber.value || !guess.value) return;
      if (guess.value < 1 || guess.value > 100) return;

      attempts.value++;

      if (guess.value === targetNumber.value) {
        gameOver.value = true;
        lastHint.value = "";
        
        // Submit score (lower attempts = higher score)
        const score = Math.max(0, 100 - attempts.value);
        leaderboardStore.submitScore("number-guess", score, {
          attempts: attempts.value,
          targetNumber: targetNumber.value,
        }).catch(error => {
          console.error("Error submitting score:", error);
        });
      } else if (guess.value < targetNumber.value) {
        lastHint.value = "Too low! Try higher.";
      } else {
        lastHint.value = "Too high! Try lower.";
      }
    };

    return {
      gameStarted,
      gameOver,
      guess,
      attempts,
      lastHint,
      bestScore,
      hintClass,
      startGame,
      makeGuess,
    };
  },
});
</script>

