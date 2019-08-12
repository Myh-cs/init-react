import { IM_MESSAGE, IM_OPEN, IM_ERROR } from '../constants/ActionTypes'
const initialState = {
  message: ''
}

export default function eventsource(state = initialState, action = {}){
  switch (action.type) {
    case IM_MESSAGE:
      return {
        ...state,
        message: action.payload.data
      }
    case IM_OPEN:
      return state;
    case IM_ERROR:
      return state;
    default:
      return state;
  }
}