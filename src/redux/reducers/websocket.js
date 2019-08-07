import { WEBSOCKET_MESSAGE } from '../constants/ActionTypes'
const initialState = {
  message: ''
}

export default function socket(state = initialState, action = {}){
  switch (action.type) {
    case WEBSOCKET_MESSAGE:
      return {
        ...state,
        message: action.payload.data
      }
    default:
      return state;
  }
}