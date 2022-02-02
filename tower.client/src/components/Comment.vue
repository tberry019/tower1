<template>
  <div class="component">
    <!-- {{ comment.body }} -->
  </div>
  <div class="card" style="width: 10rem">
    <img :src="comment.creator.picture" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ comment.creator.name }}</h5>
      <p class="card-text">
        {{ comment.body }}
      </p>
      <button @click.prevent="deleteComment()" class="btn btn-danger">
        Delete
      </button>
    </div>
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
    // onMounted(async () => {
    //   try {
    //     await towerEventService.getEventComments(route.params.id)
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
    return {
      comments: computed(() => AppState.comments),
      //towerEvent: computed(()=> AppState.towerEvents.filter(t => t.creatorId == props.creatorId.id)),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await towerEventService.deleteComment(props.comment.id, route.params.id)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error.message)
        }

      }


    }
  }
}
</script>


<style lang="scss" scoped>
</style>