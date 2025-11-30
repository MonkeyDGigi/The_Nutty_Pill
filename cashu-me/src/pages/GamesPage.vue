<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <h4 class="q-mb-md">GAMES</h4>
        
        <!-- Active Match -->
        <div v-if="gamesStore.hasActiveMatch && gamesStore.activeMatch" class="q-mb-md">
          <q-card class="q-pa-md">
            <div class="text-h6 q-mb-sm">Active Match</div>
            <div>Game: {{ gamesStore.activeMatch.gameType }}</div>
            <div>Bet: {{ gamesStore.activeMatch.betAmount }} {{ gamesStore.activeMatch.unit }}</div>
            <div>Status: {{ gamesStore.activeMatch.status }}</div>
            <q-btn 
              v-if="gamesStore.activeMatch.status === 'waiting'"
              @click="cancelActiveMatch"
              class="q-mt-md"
            >
              Cancel Match
            </q-btn>
          </q-card>
        </div>

        <!-- Game Selection -->
        <div v-else>
          <!-- Single Player Games -->
          <div class="q-mb-lg">
            <div class="text-h6 q-mb-md">Single Player Games</div>
            <div class="row q-col-gutter-md">
              <div 
                v-for="game in singlePlayerGames" 
                :key="game.type"
                class="col-12 col-sm-6 col-md-4"
              >
                <q-card 
                  class="game-card cursor-pointer"
                  @click="playSinglePlayerGame(game.type)"
                >
                  <q-card-section>
                    <div class="text-h6">{{ game.name }}</div>
                    <div class="text-caption">{{ game.description }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <!-- Multiplayer Games -->
          <div>
            <div class="text-h6 q-mb-md">Multiplayer Games (Coming Soon)</div>
            <div class="row q-col-gutter-md">
              <div 
                v-for="game in multiplayerGames" 
                :key="game.type"
                class="col-12 col-sm-6 col-md-4"
              >
                <q-card 
                  class="game-card cursor-pointer"
                  @click="selectGame(game.type)"
                >
                  <q-card-section>
                    <div class="text-h6">{{ game.name }}</div>
                    <div class="text-caption">{{ game.description }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>

        <!-- Matchmaking Dialog -->
        <q-dialog v-model="showMatchmakingDialog">
          <q-card class="q-pa-md" style="min-width: 300px">
            <q-card-section>
              <div class="text-h6">Create Match</div>
            </q-card-section>
            
            <q-card-section>
              <q-input
                v-model.number="betAmount"
                type="number"
                label="Bet Amount (sats)"
                :min="1"
                class="q-mb-md"
              />
              
              <div class="row q-gutter-sm">
                <q-btn 
                  @click="createMatch"
                  :loading="creatingMatch"
                  class="col"
                >
                  Create & Wait
                </q-btn>
                <q-btn 
                  @click="findRandomMatch"
                  :loading="searching"
                  class="col"
                >
                  Find Match
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGamesStore } from "src/stores/games";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GamesPage",
  setup() {
    const gamesStore = useGamesStore();
    const router = useRouter();
    const showMatchmakingDialog = ref(false);
    const selectedGameType = ref<string | null>(null);
    const betAmount = ref(100);
    const creatingMatch = ref(false);
    const searching = ref(false);

    const singlePlayerGames = [
      {
        type: "reaction-time",
        name: "Reaction Time",
        description: "Test your reflexes",
      },
      {
        type: "number-guess",
        name: "Number Guess",
        description: "Guess the number",
      },
    ];

    const multiplayerGames = [
      {
        type: "rock-paper-scissors",
        name: "Rock Paper Scissors",
        description: "Classic RPS game",
      },
      {
        type: "tic-tac-toe",
        name: "Tic Tac Toe",
        description: "3x3 grid strategy",
      },
    ];

    const availableGames = [...singlePlayerGames, ...multiplayerGames];

    const selectGame = (gameType: string) => {
      selectedGameType.value = gameType;
      showMatchmakingDialog.value = true;
    };

    const createMatch = async () => {
      if (!selectedGameType.value) return;
      
      creatingMatch.value = true;
      try {
        await gamesStore.createMatch(
          selectedGameType.value as any,
          betAmount.value,
          "sat"
        );
        showMatchmakingDialog.value = false;
        // Navigate to game lobby
        router.push(`/game/${gamesStore.activeMatch?.id}`);
      } catch (error: any) {
        console.error("Error creating match:", error);
        // Show error notification
      } finally {
        creatingMatch.value = false;
      }
    };

    const findRandomMatch = async () => {
      if (!selectedGameType.value) return;
      
      searching.value = true;
      try {
        gamesStore.startSearching(
          selectedGameType.value as any,
          betAmount.value,
          "sat"
        );
        showMatchmakingDialog.value = false;
        // Navigate to game lobby when matched
        if (gamesStore.activeMatch) {
          router.push(`/game/${gamesStore.activeMatch.id}`);
        }
      } catch (error: any) {
        console.error("Error finding match:", error);
      } finally {
        searching.value = false;
      }
    };

    const cancelActiveMatch = async () => {
      if (!gamesStore.activeMatch) return;
      
      try {
        await gamesStore.cancelMatch(gamesStore.activeMatch.id);
      } catch (error: any) {
        console.error("Error cancelling match:", error);
      }
    };

    const playSinglePlayerGame = (gameType: string) => {
      router.push(`/game/single/${gameType}`);
    };

    return {
      gamesStore,
      availableGames,
      singlePlayerGames,
      multiplayerGames,
      showMatchmakingDialog,
      selectedGameType,
      betAmount,
      creatingMatch,
      searching,
      selectGame,
      createMatch,
      findRandomMatch,
      cancelActiveMatch,
      playSinglePlayerGame,
    };
  },
});
</script>

<style scoped>
.game-card {
  transition: transform 0.2s;
}

.game-card:hover {
  transform: translateY(-2px);
}
</style>

