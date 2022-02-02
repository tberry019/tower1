<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center">
      <h3>This is the event details page!</h3>
      <button
        class="
          col-3
          btn btn-white
          border border-dark border-4
          text-white
          fs-3
          text-center
          m-0
          fw-bold
          bg-info
          me-5
          font-monospace
        "
        data-bs-toggle="modal"
        data-bs-target="#editTowerEvent"
      >
        Edit Event
      </button>
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
        <!-- <div class="card" style="width: 10rem">
          <div v-for="c in comments" :key="c.id">
            <img :src="c.creator.picture" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ c.creator.name }}</h5>
              <p class="card-text">
                {{ c.body }}
              </p>
              <button @click.prevent="deleteComment()" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div> -->
        <Comment v-for="c in comments" :key="c.id" :comment="c" />
        <form @submit.prevent="createComment">
          <div class="form-group mb-3">
            <label for="body"></label>
            <input
              type="text"
              class="form-control"
              name="body"
              id="body"
              v-model="editable.body"
              placeholder="Join the Conversation"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />

            <button
              class="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Submit Comment
            </button>
            <!-- <button
              class="btn btn-outline-danger"
              type="button"
              id="button-addon2"
            >
              Remove Comment
            </button> -->
          </div>
        </form>
      </div>
    </div>
  </div>

  <Modal id="editTowerEvent">
    <template #modal-title>
      <h4>Edit Event</h4>
    </template>
    <template #modal-body>
      <EditEventForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { towerEventService } from "../services/TowerEventService"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import Comment from "../components/Comment.vue"
export default {

  name: 'EventDetails',
  setup(props) {
    const editable = ref({})
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
      editable,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvent),
      comments: computed(() => AppState.comments),
      //newComment: computed(() => AppState.newComment),
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
          await towerEventService.createComment(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log()
        }
      },

      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await towerEventService.deleteComment(route.params.id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },
      async getCommentByEventTower() {
        try {
          await towerEventService.getEventComments()
        } catch (error) {
          Pop.toast(error.message, "error")
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
