<template>
  <div class="row">
    <TowerEvents v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
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
    // onMounted(async () => {
    //   try {
    //     await towerEventService.getAllTowerEvents()
    //   } catch (error) {
    //     Pop.toast(error.message, "error")
    //     logger.log(error)
    //   }
    // })
    onMounted(() => towerEventService.getAllTowerEvents())
    return {
      user: computed(() => AppState.user),
      towerEvents: computed(() => AppState.towerEvents),
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
