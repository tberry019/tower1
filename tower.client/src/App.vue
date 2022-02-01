<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <!-- <footer>
    <div class="bg-light text-dark text-center p-4">
      Made with 💖 by Taylor Berry
    </div>
  </footer> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
