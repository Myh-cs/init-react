import * as types from '../constants/ActionTypes'


export const changeLang = () => (dispatch) => dispatch({
  type: types.SWITCH_LANG
})


// url = 'http://10.205.20.170:8080/Gradle___IM_war__exploded_/push', options = { withCredentials: true }
export const connectServer = (url = 'ws://10.205.20.170:8080/Gradle___IM_war__exploded_/marco') => ({
  type: types.IM_CONNECT,
  payload: { url }
})


export const sendServer = message => dispatch => {
  dispatch({
    type: types.IM_SEND,
    payload: message
  })
}

export const closeServer = () => dispatch => {
  dispatch({
    type: types.IM_DISCONNECT
  })
}