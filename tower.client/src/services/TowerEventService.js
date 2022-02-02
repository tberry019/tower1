import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class TowerEventService {
  async getAllTowerEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data
    AppState.filteredEvents = res.data
    // logger.log(res.data)

  }

  async createTowerEvent(newTowerEvent) {
    const res = await api.post('api/events', newTowerEvent)
    // logger.log('creating a new towerEvent', res.data)
    AppState.towerEvents.unshift(res.data)
    return res.data
  }

  async getTowerEventById(id) {
    const res = await api.get('api/events/' + id)
    // logger.log('getting event by id', res.data)
    AppState.towerEvent = res.data
    console.log(res.data)
  }

  async editTowerEvent(updatedEvent) {
    const res = await api.put('api/events/' + updatedEvent.id, updatedEvent)
    logger.log('editing tower event', res.data)
    AppState.towerEvents = new towerEvents
  }

  async deleteTowerEvent(id) {
    const res = await api.delete('api/events/' + id)
    logger.log('canceled event')
    AppState.towerEvent = AppState.towerEvent.filter(t => t.id !== id)
  }

  async createComment(newComment) {
    const res = await api.post('api/comments/', newComment)

    AppState.comments.unshift(res.data)
    logger.log('creating comment', res.data)
    return res.data
  }

  async deleteComment(comment) {
    const res = await api.delete('api/comments/' + comment._id)
    logger.log('removed comment')
    AppState.comments = AppState.comments.filter(c => c.id !== id)
  }

  async getEventComments(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    AppState.comments = res.data
    logger.log('get comments res', res.data)

  }

  async attendEvent(id) {
    const res = await api.post('api/attendees/', { eventId: id })
    // logger.log('attending event', res.data)
    AppState.attendees.unshift(res.data)
    return res.data
  }

  async getEventAttendees(eventId) {
    const res = await api.get('api/events/' + eventId + '/attendees')
    //logger.log('pullling attendees', res.data)
    AppState.attendees = res.data

  }
  async getMyEvents() {
    const res = await api.get('api/account/attendees')
    //logger.log('pulling my events', res.data)
    AppState.myEvents = res.data
    logger.log(error)
  }

}



export const towerEventService = new TowerEventService()