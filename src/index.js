import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import Locale from '@/locale';
import reducer from './store/reducers'
import RouteConfig from './router'
import websocket from './store/middleware/websocket'

const middleware = [thunk, websocket];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const compose = x => x; // chrom调试redux插件要用到
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// chrom调试redux插件要用到
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),// chrom调试redux插件要用到
)


render(
  <Provider store={store}>
    <Locale>
      <RouteConfig />
    </Locale>
  </Provider>,
  document.getElementById('root')
)
