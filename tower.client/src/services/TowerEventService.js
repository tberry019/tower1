import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class TowerEventService {
  async getAllTowerEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data
    logger.log(res.data)

  }

  async createTowerEvent(newTowerEvent) {
    const res = await api.post('api/events', newTowerEvent)
    logger.log('creating a new towerEvent', res.data)
    AppState.towerEvents.unshift(res.data)
  }

  // async getTowerEventById(id) {
  //   const res = await api.get('api/events/' + id)
  //   logger.log('getting event by id', res.data)
  //   AppState.towerEvents = res.data
  // }
}



export const towerEventService = new TowerEventService()