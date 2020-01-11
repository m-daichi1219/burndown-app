import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import AppBurnDownView from './AppBurnDownView';
import AppVelocityView from './AppVelocityView';
import '../css/App.css';

const App = () => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
      <title>BurnDown App</title>
    </Helmet>
    <Router>
      <header>
        <Link to="/burndown">BurnDown</Link>
        <Link to="/velocity">Velocity</Link>
      </header>
      <Switch>
        <Route exact path="/">
          <Redirect to="/burndown" />
        </Route>
        <Route path="/burndown">
          <AppBurnDownView />
        </Route>
        <Route path="/velocity">
          <AppVelocityView />
        </Route>
        <Route path="/*">
          <p>404</p>
        </Route>
      </Switch>
    </Router>
  </div>
);


export default App;
