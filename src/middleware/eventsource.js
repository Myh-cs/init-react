import * as types from '../redux/constants/ActionTypes'

let eventsource;
const middleware = store => next => action => {
  const { dispatch } = store;
  switch(action.type) {
    case types.EVENTSOURCE_CONNECT:
      eventsource = new EventSource(action.payload.url, action.payload.options);

      eventsource.onopen = () => dispatch({ type: types.EVENTSOURCE_OPEN });
      eventsource.onclose = (event) => dispatch({ type: types.EVENTSOURCE_CLOSE, payload: event });
      eventsource.onmessage = (event) => dispatch({ type: types.EVENTSOURCE_MESSAGE, payload: event });
      break;

    case types.EVENTSOURCE_DISCONNECT:
      eventsource.close();
      break;

    default:
      break;
  }

  return next(action);
}

export default middleware;