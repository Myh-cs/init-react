import { EVENTSOURCE_MESSAGE } from '../constants/ActionTypes'
const initialState = {
  events: []
}

export default function eventsource(state = initialState, action = {}){
  switch (action.type) {
    case EVENTSOURCE_MESSAGE:
      return {
        ...state,
        events: [...state.events, action.payload.data]
      }
    default:
      return state;
  }
}