import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import BaseLayout from './Layout/BaseLayout';
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

const Todo = Loadable({
  loader: () => import('./pages/Todo'),
  loading: Loading,
});

const AppWarp = props => <App {...props} />

function RouteConfig() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={withAuthority(LoadableComponent)} />
        <Route path="/login" component={Login} />
        <Route path="/todo" component={withAuthority(Todo)} />
        <Route path="/app" render={withAuthority(AppWarp)} />
        <Route path="/layout">
          <BaseLayout>
            <Route path="/layout/apps" render={withAuthority(AppWarp)} />
          </BaseLayout>
        </Route>
        <Redirect from="*" to='/' />
      </Switch>
    </Router>
  )
}
export default RouteConfig;