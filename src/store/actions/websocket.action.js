import { IM_CONNECT, IM_SEND, IM_DISCONNECT } from '../constants/ActionTypes';

// url = 'http://10.205.20.170:8080/Gradle___IM_war__exploded_/push', options = { withCredentials: true }
export const connectServer = (url = 'ws://10.205.20.170:8080/Gradle___IM_war__exploded_/marco') => ({
  type: IM_CONNECT,
  payload: { url }
})

export const sendServer = message => dispatch => {
  dispatch({
    type: IM_SEND,
    payload: message
  })
}

export const closeServer = () => dispatch => {
  dispatch({
    type: IM_DISCONNECT
  })
}
