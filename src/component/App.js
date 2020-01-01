import React from 'react';
import AppTaskTable from './AppTaskTable';
import AppSprintTable from './AppSprintTable';
import AppLineChart from './AppLineChart';
import '../css/App.css';

const App = () => (
  <div className="App">
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
