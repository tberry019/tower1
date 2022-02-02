<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center">
      <h3>This is the event details page!</h3>
      <div class="card col-10 d-flex justify-content- center">
        <img
          :src="towerEvent.coverImg"
          class="card-img-top w-25"
          alt="coverImg"
        />
        <div class="card-body">
          <h5 class="card-title">{{ towerEvent.name }}</h5>
          <p class="card-text text-start">
            {{ towerEvent.description }}
          </p>
          <p>{{ towerEvent.location }}</p>
          <p>{{ towerEvent.startDate }}</p>
          <p>{{ towerEvent.location }}</p>
          <p>Seats Remaining: {{ towerEvent.capacity }}</p>
          <p class="text-danger" v-if="towerEvent.isCanceled == true">
            Event is <b class="text-color: red">CANCELED</b>
          </p>
          <b>
            <p v-if="towerEvent.capacity <= 0">THIS SHOW IS SOLD OUT!!</p>
          </b>
          <a href="#" class="btn btn-primary">Attend</a>
          <a href="#" class="btn btn-danger">Cancel</a>
          <!-- <p v-if="towerEvent.commen <= 0">THIS SHOW IS SOLD OUT!!</p> -->
        </div>
        <Comment v-for="c in comments" :key="c.id" :comment="c" />
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Join the Conversation"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { towerEventService } from "../services/TowerEventService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import Comment from "../components/Comment.vue"
export default {
  name: 'TowerEvents',


  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await towerEventService.getTowerEventById(route.params.id)
        await towerEventService.getEventComments(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }

    })
    return {
      user: computed(() => AppState.user),
      towerEvent: computed(() => AppState.towerEvent),
      comments: computed(() => AppState.comments),

      async deleteTowerEvent(id) {
        try {
          if (await Pop.confirm()) {
            await towerEventService.deleteTowerEvent(id)
          }
        } catch (error) {
          Pop(error.message, "error")
          logger.log(error.message)
        }
      },
      async createComment() {
        try {
          const newComment = await towerEventService.createComment(editable.value)
          router.push({ name: 'EventDetails', params: { id: newComment.id } })

        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },

      async deleteComment(id) {
        try {
          if (await Pop.confirm()) {
            await towerEventService.deleteComment(id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      }
    }
  }
}
</script>
