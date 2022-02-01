<template>
  <div class="row">
    <TowerEvents v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { towerEventService } from "../services/TowerEventService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
export default {
  name: 'EventDetailsPage',
  setup() {
    const route = useRoute()
    onMounted(() => towerEventService.getTowerEventById(route.params.id))
    return {
      user: computed(() => AppState.user),
      towerEvents: computed(() => AppState.towerEvents),
    }
  }
}
</script>
