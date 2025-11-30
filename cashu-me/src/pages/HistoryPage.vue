<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-y-md justify-center">
      <div class="col-12 col-sm-11 col-md-8">
        <h4 class="q-mb-md">{{ $t("WalletPage.tabs.history.label") }}</h4>
        <HistoryTable />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoryTable from "components/HistoryTable.vue";

export default defineComponent({
  name: "HistoryPage",
  components: {
    HistoryTable,
  },
});
</script>

