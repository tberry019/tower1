<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="col-8 py-3" v-for="p in towerEvents" :key="p.id"></div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  props: {
    towerEvents: {
      type: Object
    }
  },
  name: 'Account',
  setup(props) {
    return {
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
