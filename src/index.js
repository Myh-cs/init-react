import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import Locale from './locale';
import reducer from './redux/reducers'
import { getAllProducts } from './redux/actions'
import RouteConfig from './router'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const compose = x => x;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
)

store.dispatch(getAllProducts())

render(
  <Provider store={store}>
    <Locale>
      <RouteConfig />
    </Locale>
  </Provider>,
  document.getElementById('root')
)
