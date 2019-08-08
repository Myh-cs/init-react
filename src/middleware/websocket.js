import * as types from '../redux/constants/ActionTypes'

let websocket;
const middleware = store => next => action => {
  const { dispatch } = store;
  switch(action.type) {
    case types.WEBSOCKET_CONNECT:
      websocket = new WebSocket(action.payload.url);

      websocket.onopen = () => dispatch({ type: types.WEBSOCKET_OPEN });
      websocket.onclose = (event) => dispatch({ type: types.WEBSOCKET_CLOSE, payload: event });
      websocket.onmessage = (event) => dispatch({ type: types.WEBSOCKET_MESSAGE, payload: event });
      break;

    case types.WEBSOCKET_SEND:
      websocket.send(JSON.stringify(action.payload));
      break;

    case types.WEBSOCKET_DISCONNECT:
      websocket.close();
      break;

    default:
      break;
  }

  return next(action);
}

export default middleware;