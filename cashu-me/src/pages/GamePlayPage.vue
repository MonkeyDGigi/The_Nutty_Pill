<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <div v-if="!match" class="text-center">
          <div class="text-h6">Match not found</div>
          <q-btn @click="$router.push('/games')" class="q-mt-md">
            Back to Games
          </q-btn>
        </div>

        <div v-else>
          <div class="text-h6 q-mb-md">{{ getGameName(match.gameType) }}</div>
          
          <!-- Game-specific components will go here -->
          <q-card class="q-pa-md">
            <div class="text-center">
              <div class="text-subtitle1 q-mb-md">Game: {{ match.gameType }}</div>
              <div class="text-caption q-mb-md">
                Pot: {{ match.betAmount * 2 }} {{ match.unit }}
              </div>
              
              <!-- Placeholder for game UI -->
              <div class="q-pa-lg">
                <div class="text-body1">Game UI coming soon...</div>
                <div class="text-caption q-mt-sm">
                  This is where the actual game will be rendered
                </div>
              </div>

              <q-btn 
                v-if="match.status === 'matched' || match.status === 'playing'"
                @click="startPlaying"
                class="q-mt-md"
              >
                Start Playing
              </q-btn>
              <div v-if="match.status === 'playing'" class="q-mt-md">
                <q-btn 
                  @click="declareWinner(match.player1.id)"
                  class="q-mr-sm"
                >
                  Test: Player 1 Wins
                </q-btn>
                <q-btn 
                  v-if="match.player2"
                  @click="declareWinner(match.player2.id)"
                >
                  Test: Player 2 Wins
                </q-btn>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGamesStore } from "src/stores/games";

export default defineComponent({
  name: "GamePlayPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const gamesStore = useGamesStore();
    const matchId = route.params.matchId as string;

    const match = computed(() => {
      return gamesStore.activeMatch?.id === matchId 
        ? gamesStore.activeMatch 
        : null;
    });

    const getGameName = (gameType: string) => {
      const names: Record<string, string> = {
        "rock-paper-scissors": "Rock Paper Scissors",
        "tic-tac-toe": "Tic Tac Toe",
        "number-guess": "Number Guess",
        "reaction-time": "Reaction Time",
      };
      return names[gameType] || gameType;
    };

    const startPlaying = () => {
      if (!match.value) return;
      match.value.status = "playing";
    };

    const declareWinner = async (playerId: string) => {
      if (!match.value) return;
      
      // Determine the actual player ID
      const winnerId = match.value.player1.id === playerId 
        ? match.value.player1.id 
        : match.value.player2?.id || playerId;
      
      try {
        await gamesStore.finishGame(winnerId);
        router.push("/games");
      } catch (error: any) {
        console.error("Error finishing game:", error);
      }
    };

    return {
      match,
      getGameName,
      startPlaying,
      declareWinner,
    };
  },
});
</script>

