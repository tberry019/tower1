<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center">
      <h3>This is the event details page!</h3>
      <div>
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

            <p>Seats Remaining: {{ towerEvent.capacity }}</p>
            <p class="text-danger" v-if="towerEvent.isCanceled == true">
              Event is <b class="text-color: red">CANCELED</b>
            </p>
            <b>
              <p v-if="towerEvent.capacity <= 0">THIS SHOW IS SOLD OUT!!</p>
            </b>
            <div v-if="!attendee">
              <div v-if="towerEvent.capacity > 0">
                <button @click="attendEvent(eventId)" class="btn btn-primary">
                  Attend Event
                </button>
              </div>
            </div>
          </div>
          <div v-if="towerEvent.isCanceled == false">
            <button
              @click.prevent="deleteTowerEvent()"
              v-if="towerEvent.creatorId == account.id"
              class="btn btn-danger"
            >
              Cancel Event
            </button>
          </div>
          <div class="py-2 rounded" v-for="a in attendees" :key="a.id">
            <img :src="a.account.picture" :title="a.account.name" />
          </div>
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
          <button
            class="btn btn-outline-danger"
            type="button"
            id="button-addon2"
          >
            Remove Comment
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


  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await towerEventService.getTowerEventById(route.params.id)
        await towerEventService.getEventComments(route.params.id)
        await towerEventService.getEventAttendees(route.params.id)
        // await towerEventService.getMyAttendance(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }

    })
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees),
      attendee: computed(() => AppState.attendees.find((a) => a.accountId == AppState.account.id)),


      async deleteTowerEvent() {
        try {
          if (await Pop.confirm()) {
            await towerEventService.deleteTowerEvent(route.params.id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },
      async createComment() {
        try {
          const newComment = await towerEventService.createComment(editable.value)
          // router.push({ name: 'EventDetails', params: { id: newComment.id } })
          logger.log('creating comment', editable.value)

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
      },
      async attendEvent() {
        try {
          await towerEventService.attendEvent(route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      }

    }
  }
}
</script>
