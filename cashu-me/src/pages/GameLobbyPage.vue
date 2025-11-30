<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <GameLobby :match-id="matchId" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import GameLobby from "components/GameLobby.vue";

export default defineComponent({
  name: "GameLobbyPage",
  components: {
    GameLobby,
  },
  setup() {
    const route = useRoute();
    const matchId = route.params.matchId as string;

    return {
      matchId,
    };
  },
});
</script>

