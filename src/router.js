import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
// import App from './pages/App';
// import Loading from './my-loading-component'; // 国际化
const Loading = () => <span>loading</span>
const LoadableComponent = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});
const App = Loadable({
  loader: () => import('./pages/App'),
  loading: Loading,
});
const AppWarp = props => <App {...props} />

function RouteConfig(params) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoadableComponent} />
        <Route path="/app" render={AppWarp} />
        <Redirect from="*" to='/' />
      </Switch>
    </Router>
  )
}
export default RouteConfig;