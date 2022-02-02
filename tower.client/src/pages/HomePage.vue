<template>
  <div class="row">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Event Type
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li @click="filterEvents('concert')">
          <a class="dropdown-item" href="#">Concert</a>
        </li>
        <li @click="filterEvents('convention')">
          <a class="dropdown-item" href="#"> Convention</a>
        </li>
        <li @click="filterEvents('sport')">
          <a class="dropdown-item" href="#">Sports</a>
        </li>
        <li @click="filterEvents('digital')">
          <a class="dropdown-item" href="#">Digital</a>
        </li>
      </ul>
    </div>
    <EventCard v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { towerEventService } from "../services/TowerEventService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

export default {
  name: 'Home',

  setup() {
    onMounted(async () => {
      try {
        await towerEventService.getAllTowerEvents()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    onMounted(() => towerEventService.getAllTowerEvents())
    return {
      towerEvents: computed(() => AppState.filteredEvents),
      user: computed(() => AppState.user),


      filterEvents(type) {
        let filteredEvents = AppState.towerEvents.filter
          (t => t.type == type)
        logger.log(filteredEvents)
        AppState.filteredEvents = filteredEvents

      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
