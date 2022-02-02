<template>
  <div class="about text-center">
    <h1>Welcome to your Account Page {{ account.name }}!</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <EventCard v-for="t in myEvents" :key="t.id" :towerEvent="t" />
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { towerEventService } from "../services/TowerEventService"

export default {
  props: {
    towerEvents: {
      type: Object
    }
  },
  name: 'Account',
  setup() {
    onMounted(() => towerEventService.getMyEvents())
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents)
    }

  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
