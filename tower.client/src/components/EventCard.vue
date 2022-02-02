<template>
  <div class="col-lg-4 my-3">
    <router-link :to="{ name: 'EventDetails', params: { id: towerEvent.id } }">
      <div class="towerEventCard">
        <div class="card p-5 bg-white elevation-3 rounded">
          <img :src="towerEvent.coverImg" alt="Img" class="rounded-circle" />
          <h1 class="my-5 bg-light text-dark p-3 text-center">
            {{ towerEvent.name }}
          </h1>
          <p>{{ towerEvent.startDate }}</p>
          <p>Seats Remaining: {{ towerEvent.capacity }}</p>
          <p>{{ towerEvent.location }}</p>
          <p class="text-danger" v-if="towerEvent.isCanceled == true">
            Event is <b class="text-color: red">CANCELED</b>
          </p>
          <b>
            <p v-if="towerEvent.capacity <= 0">THIS SHOW IS SOLD OUT!!</p>
          </b>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { towerEventService } from "../services/TowerEventService"

export default {
  name: 'TowerEvents',
  props: {
    towerEvent: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    return {
      towerEvents: computed(() => AppState.towerEvents),
    }
  }
}
</script>


<style lang="scss" scoped >
</style>