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
          <!-- <div v-for="c in comments" :key="c.creator.id">
            {{ c.body }}
          </div> -->
        </div>
        <!-- <Comment v-for="c in comments" :key="c.id" /> -->
        <div v-for="c in comments" :key="c.id">
          <p>
            {{ c.body }}
          </p>
          <img class="rounded" :src="c.creator.picture" />
          {{ c.creator.name }}
        </div>

        <form @submit.prevent="editTowerEvent">
          <div class="form-group">
            <label for="name">Name...</label>
            <input
              placeholder="Name"
              v-model="editable.name"
              type="text"
              class="form-control"
              name="name"
              id="name"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description...</label>
            <input
              placeholder="Description"
              v-model="editable.description"
              type="text"
              class="form-control"
              name="description"
              id="description"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="Type">Type...</label>
            <input
              placeholder="Type"
              v-model="editable.type"
              type="text"
              class="form-control"
              name="type"
              id="type"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="startDate">Start Date...</label>
            <input
              placeholder="startDate"
              v-model="editable.startDate"
              type="text"
              class="form-control"
              name="startDate"
              id="startDate"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="capacity">Capacity...</label>
            <input
              placeholder="Capacity"
              v-model="editable.capacity"
              type="text"
              class="form-control"
              name="capacity"
              id="capacity"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="location">Location...</label>
            <input
              placeholder="Location"
              v-model="editable.location"
              type="text"
              class="form-control"
              name="location"
              id="location"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="form-group">
            <label for="coverImg">Cover Image...</label>
            <input
              placeholder="Cover Image"
              v-model="editable.coverImg"
              type="text"
              class="form-control"
              name="coverImg"
              id="coverImg"
              min="2"
              max="50"
              required
            />
          </div>
          <div class="d-flex justify-content-between my-2">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn btn-danger"
            >
              <b>Cancel</b>
            </button>
            <button
              type="Submit"
              aria-label="Create"
              data-bs-dismiss="modal"
              class="btn btn-info"
            >
              <b>Create</b>
            </button>
          </div>
        </form>

        <form @submit.prevent="createComment">
          <div class="form-group mb-3">
            <label for="body">body</label>
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
  setup() {
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
