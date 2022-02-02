<template>
  <div class="component">
    {{ comment.body }}
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
import { towerEventService } from "../services/TowerEventService"
import { AppState } from "../AppState"
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await towerEventService.getEventComments(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      comments: computed(() => AppState.comments)


    }
  }
}
</script>


<style lang="scss" scoped>
</style>