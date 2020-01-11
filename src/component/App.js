import React from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import AppBurnDownView from './AppBurnDownView';
import '../css/App.css';

const App = () => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
      <title>BurnDown App</title>
    </Helmet>
    <AppBurnDownView />
  </div>
);


export default App;
