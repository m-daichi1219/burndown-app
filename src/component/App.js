import React from 'react';
import Helmet from 'react-helmet';
import AppTaskTable from './AppTaskTable';
import AppSprintTable from './AppSprintTable';
import AppLineChart from './AppLineChart';
import '../css/App.css';

const App = () => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
      <title>BurnDown App</title>
    </Helmet>
    <div className="task-area">
      <AppTaskTable />
    </div>
    <div className="chart-area">
      <AppLineChart />
    </div>
    <div className="sprint-area">
      <AppSprintTable />
    </div>
  </div>
);


export default App;
