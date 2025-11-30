<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-mb-md">Snake</div>
      <div class="text-caption q-mb-md">
        Use arrow keys or swipe to control the snake
      </div>
    </q-card-section>

    <q-card-section class="text-center">
      <div class="snake-game-container">
        <canvas
          ref="gameCanvas"
          :width="canvasSize"
          :height="canvasSize"
          class="snake-canvas"
          @keydown="handleKeyDown"
          tabindex="0"
        ></canvas>
      </div>

      <div class="q-mt-md">
        <div class="text-body1">Score: {{ score }}</div>
        <div v-if="bestScore" class="text-caption q-mt-xs">
          Your Best: {{ bestScore }}
        </div>
      </div>

      <div v-if="gameOver" class="q-mt-md">
        <div class="text-h6 q-mb-sm">Game Over!</div>
        <div class="text-body2 q-mb-md">Final Score: {{ score }}</div>
        <q-btn @click="startGame">Play Again</q-btn>
      </div>

      <div v-else-if="!gameStarted" class="q-mt-md">
        <q-btn @click="startGame">Start Game</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useLeaderboardStore } from "src/stores/leaderboard";

type Position = { x: number; y: number };

export default defineComponent({
  name: "SnakeGame",
  setup() {
    const leaderboardStore = useLeaderboardStore();
    const gameCanvas = ref<HTMLCanvasElement | null>(null);
    const gameStarted = ref(false);
    const gameOver = ref(false);
    const score = ref(0);
    const canvasSize = ref(400);
    const gridSize = 20;
    const tileCount = canvasSize.value / gridSize;

    const snake = ref<Position[]>([{ x: 10, y: 10 }]);
    const direction = ref<Position>({ x: 0, y: 0 });
    const food = ref<Position>({ x: 15, y: 15 });
    const gameLoop = ref<number | null>(null);

    const bestScore = computed(() => {
      return leaderboardStore.getUserBestScore("snake");
    });

    const draw = () => {
      if (!gameCanvas.value) return;

      const ctx = gameCanvas.value.getContext("2d");
      if (!ctx) return;

      // Clear canvas with black background (Nokia style)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvasSize.value, canvasSize.value);

      // Draw grid (subtle)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 1;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvasSize.value);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvasSize.value, i * gridSize);
        ctx.stroke();
      }

      // Draw snake (green, Nokia style)
      ctx.fillStyle = "#00ff00";
      snake.value.forEach((segment, index) => {
        if (index === 0) {
          // Head slightly brighter
          ctx.fillStyle = "#00ff88";
        } else {
          ctx.fillStyle = "#00ff00";
        }
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });

      // Draw food (red, Nokia style)
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(
        food.value.x * gridSize + 1,
        food.value.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      );
    };

    const moveSnake = () => {
      if (gameOver.value || !gameStarted.value) return;

      const head = { ...snake.value[0] };
      head.x += direction.value.x;
      head.y += direction.value.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
      ) {
        endGame();
        return;
      }

      // Check self collision (skip the head itself)
      for (let i = 1; i < snake.value.length; i++) {
        const segment = snake.value[i];
        if (head.x === segment.x && head.y === segment.y) {
          endGame();
          return;
        }
      }

      snake.value.unshift(head);

      // Check food collision
      if (head.x === food.value.x && head.y === food.value.y) {
        score.value++;
        generateFood();
      } else {
        snake.value.pop();
      }

      draw();
    };

    const generateFood = () => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        };
      } while (
        snake.value.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      );
      food.value = newFood;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameStarted.value || gameOver.value) return;

      const key = event.key;
      const newDirection = { ...direction.value };

      // Prevent reversing into itself
      if (key === "ArrowUp" && direction.value.y === 0) {
        newDirection.x = 0;
        newDirection.y = -1;
      } else if (key === "ArrowDown" && direction.value.y === 0) {
        newDirection.x = 0;
        newDirection.y = 1;
      } else if (key === "ArrowLeft" && direction.value.x === 0) {
        newDirection.x = -1;
        newDirection.y = 0;
      } else if (key === "ArrowRight" && direction.value.x === 0) {
        newDirection.x = 1;
        newDirection.y = 0;
      } else {
        return; // Invalid key or would reverse
      }

      direction.value = newDirection;
      event.preventDefault();
    };

    const startGame = () => {
      gameStarted.value = true;
      gameOver.value = false;
      score.value = 0;
      snake.value = [{ x: 10, y: 10 }];
      direction.value = { x: 1, y: 0 }; // Start moving right
      generateFood();
      draw();

      // Focus canvas for keyboard input
      if (gameCanvas.value) {
        gameCanvas.value.focus();
      }

      // Start game loop (25% slower: 150ms * 1.25 = 187.5ms, rounded to 190ms)
      if (gameLoop.value) {
        clearInterval(gameLoop.value);
      }
      gameLoop.value = window.setInterval(moveSnake, 190);
    };

    const endGame = () => {
      gameOver.value = true;
      gameStarted.value = false;

      if (gameLoop.value) {
        clearInterval(gameLoop.value);
        gameLoop.value = null;
      }

      // Submit score
      if (score.value > 0) {
        leaderboardStore.submitScore("snake", score.value, {
          length: snake.value.length,
        }).catch(error => {
          console.error("Error submitting score:", error);
        });
      }
    };

    onMounted(() => {
      draw();
    });

    onUnmounted(() => {
      if (gameLoop.value) {
        clearInterval(gameLoop.value);
      }
    });

    return {
      gameCanvas,
      gameStarted,
      gameOver,
      score,
      canvasSize,
      bestScore,
      startGame,
      handleKeyDown,
    };
  },
});
</script>

<style scoped>
.snake-game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.snake-canvas {
  border: 2px solid rgba(157, 78, 221, 0.3);
  border-radius: 8px;
  background: #000000;
  cursor: pointer;
  outline: none;
}

.snake-canvas:focus {
  border-color: rgba(157, 78, 221, 0.6);
}
</style>

