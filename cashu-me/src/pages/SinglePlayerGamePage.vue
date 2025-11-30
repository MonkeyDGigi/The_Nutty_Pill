<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <ReactionTimeGame v-if="gameType === 'reaction-time'" />
        <NumberGuessGame v-else-if="gameType === 'number-guess'" />
        <SnakeGame v-else-if="gameType === 'snake'" />
        <div v-else class="text-center">
          <div class="text-h6">Game not found</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNostrStore } from "src/stores/nostr";
import ReactionTimeGame from "components/ReactionTimeGame.vue";
import NumberGuessGame from "components/NumberGuessGame.vue";
import SnakeGame from "components/SnakeGame.vue";

export default defineComponent({
  name: "SinglePlayerGamePage",
  components: {
    ReactionTimeGame,
    NumberGuessGame,
    SnakeGame,
  },
  setup() {
    const route = useRoute();
    const gameType = route.params.gameType as string;

    // Ensure Nostr is initialized for leaderboard
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
      gameType,
    };
  },
});
</script>

