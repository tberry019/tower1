<template>
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
        aria-label="cancel"
        class="btn btn-danger"
      >
        <b>Cancel</b>
      </button>
      <button
        type="Submit"
        aria-label="edit"
        data-bs-dismiss="modal"
        class="btn btn-info"
      >
        <b>edit</b>
      </button>
    </div>
  </form>
</template>


<script>
import { computed, ref, watchEffect } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { towerEventService } from "../services/TowerEventService"
import { Modal, } from "bootstrap"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  props: {
    towerEvent: {
      type: Object
    }
  },
  setup(props) {
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      editable.value = { ...props.towerEvent }
    })
    return {
      editable,


      async editTowerEvent() {
        try {
          await towerEventService.editTowerEvent(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      // async createComment() {
      //   try {
      //     const newComment = await towerEventService.createComment(editable.value)
      //     router.push({ name: 'EventDetails', params: { id: newComment.id } })

      //   } catch (error) {
      //     Pop.toast(error.message, 'error')
      //   }
      // }
    }
  }
}
</script>