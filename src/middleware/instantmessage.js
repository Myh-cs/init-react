import createConnection from './websocket'
// import createConnection from './eventsource'
import * as types from '../redux/constants/ActionTypes'

let connect;
const middleware = store => next => action => {
  const { dispatch } = store;
  switch(action.type) {
    case types.IM_CONNECT:
      connect = createConnection(action.payload.url, action.payload.options);

      connect.onopen = () => dispatch({ type: types.IM_OPEN });
      connect.onerror = (event) => dispatch({ type: types.IM_ERROR, payload: event });
      connect.onmessage = (event) => dispatch({ type: types.IM_MESSAGE, payload: event });
      break;

    case types.IM_SEND:
        connect.send && connect.send(JSON.stringify(action.payload));
      break;

    case types.IM_DISCONNECT:
      connect.close();
      break;

    default:
      break;
  }

  return next(action);
}

export default middleware;
