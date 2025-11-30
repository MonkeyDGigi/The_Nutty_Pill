<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <h4 class="q-ma-none">Choose Theme</h4>
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-card
          class="theme-card cursor-pointer"
          @click="changeTheme(theme.id)"
          :class="{ 'theme-active': currentTheme === theme.id }"
        >
          <q-card-section>
            <div class="row items-center">
              <q-icon :name="theme.icon" size="md" :color="theme.color" />
              <div class="q-ml-sm text-h6">{{ theme.name }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThemePage",
  mixins: [windowMixin],
  data() {
    return {
      themes: [
        {
          id: "retro",
          name: "Retro Gaming",
          description: "Purple retro gaming aesthetic",
          icon: "format_color_fill",
          color: "purple",
        },
        {
          id: "ios",
          name: "iOS Style",
          description: "Clean, modern iOS design",
          icon: "phone_iphone",
          color: "blue",
        },
        {
          id: "windows95",
          name: "Windows 95",
          description: "Classic beveled Windows 95 look",
          icon: "desktop_windows",
          color: "grey-7",
        },
        {
          id: "matrix",
          name: "Matrix",
          description: "Green terminal with glitch effects",
          icon: "code",
          color: "green",
        },
        {
          id: "neon",
          name: "Neon Cyberpunk",
          description: "Bright neon colors with glow effects",
          icon: "flare",
          color: "pink",
        },
        {
          id: "kawaii",
          name: "Kawaii",
          description: "",
          icon: "favorite",
          color: "pink-4",
        },
      ],
    };
  },
  computed: {
    currentTheme() {
      return this.$q.localStorage.getItem("cashu.theme") || "neon";
    },
  },
  methods: {
    changeTheme(theme: string) {
      // Use the mixin's changeColor method
      this.changeColor(theme);
    },
  },
});
</script>

<style scoped>
.theme-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.theme-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.theme-active {
  border-color: var(--q-primary) !important;
  box-shadow: 0 0 0 2px var(--q-primary);
}
</style>

