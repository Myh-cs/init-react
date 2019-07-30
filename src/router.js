import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import withAuthority from './withAuthority'
import Login from './pages/Login';

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
        <Route path="/" exact component={withAuthority(LoadableComponent)} />
        <Route path="/login" component={Login}/>
        <Route path="/app" render={withAuthority(AppWarp)} />
        <Redirect from="*" to='/' />
      </Switch>
    </Router>
  )
}
export default RouteConfig;