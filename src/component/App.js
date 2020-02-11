import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import AppBurnDownView from './AppBurnDownView';
import AppVelocityView from './AppVelocityView';
import AppTaskBoardView from './AppTaskBoardView';
import AppTestView from './AppTestView';
import GuardeRoute from '../router/guardes';
import '../css/App.css';

Modal.setAppElement('#root');

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
        |
        <Link to="/velocity">Velocity</Link>
        |
        <Link to="/taskboard">TaskBoard</Link>
      </header>
      <Switch>
        <Route exact path="/">
          <Redirect to="/burndown" />
        </Route>
        <GuardeRoute path="/burndown">
          <AppBurnDownView />
        </GuardeRoute>
        <GuardeRoute path="/velocity">
          <AppVelocityView />
        </GuardeRoute>
        <GuardeRoute path="/taskboard">
          <AppTaskBoardView />
        </GuardeRoute>
        <Route path="/test">
          <AppTestView />
        </Route>
        <Route path="/*">
          <p>404</p>
        </Route>
      </Switch>
    </Router>
  </div>
);


export default App;
