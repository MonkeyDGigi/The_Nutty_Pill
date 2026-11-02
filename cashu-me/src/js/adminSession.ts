import { ref } from "vue";

// True once the parent password was entered. Not persisted, so a reload locks
// the admin area again.
export const adminUnlocked = ref(false);
