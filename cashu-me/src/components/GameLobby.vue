<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Match Lobby</div>
    </q-card-section>

    <q-card-section v-if="match">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <div class="text-subtitle2">Player 1</div>
          <div>{{ match.player1.id }}</div>
          <div class="text-caption">Bet: {{ match.betAmount }} {{ match.unit }}</div>
        </div>
        
        <div class="col-12 col-md-6" v-if="match.player2">
          <div class="text-subtitle2">Player 2</div>
          <div>{{ match.player2.id }}</div>
          <div class="text-caption">Bet: {{ match.betAmount }} {{ match.unit }}</div>
        </div>
        
        <div class="col-12 col-md-6" v-else>
          <div class="text-subtitle2">Waiting for opponent...</div>
          <q-btn @click="cancelMatch" class="q-mt-sm">
            Cancel
          </q-btn>
        </div>
      </div>

      <div v-if="match.status === 'matched'" class="q-mt-md">
        <div class="text-subtitle2 q-mb-sm">Ready to play!</div>
        <div class="text-caption q-mb-md">
          Total pot: {{ match.betAmount * 2 }} {{ match.unit }}
        </div>
        <q-btn 
          @click="startGame"
          class="full-width"
        >
          Start Game
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useGamesStore } from "src/stores/games";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GameLobby",
  props: {
    matchId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const gamesStore = useGamesStore();
    const router = useRouter();

    const match = computed(() => {
      return gamesStore.activeMatch?.id === props.matchId 
        ? gamesStore.activeMatch 
        : gamesStore.pendingBets.find(m => m.id === props.matchId);
    });

    const cancelMatch = async () => {
      if (!match.value) return;
      
      try {
        await gamesStore.cancelMatch(match.value.id);
        router.push("/games");
      } catch (error: any) {
        console.error("Error cancelling match:", error);
      }
    };

    const startGame = () => {
      if (!match.value) return;
      
      // Navigate to the actual game component
      router.push(`/game/${match.value.id}/play`);
    };

    return {
      match,
      cancelMatch,
      startGame,
    };
  },
});
</script>

