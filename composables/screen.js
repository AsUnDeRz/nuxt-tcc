import { ref, onMounted, onUnmounted } from "vue";

// by convention, composable function names start with "use"
export function useCheckMobileScreen() {
  const mobileScreen = ref(false);

  if (process.client) {
    let width = window.innerWidth;

    mobileScreen.value = width <= 414;
  }

  // expose managed state as return value
  return { mobileScreen };
}
