import React from 'react';
import { useSelector } from 'react-redux';
import AppTableRow from './AppTableRow';

const App = () => {
  const rowDatas = useSelector((state) => state.datas);

  const addTask = () => {
    // const { rowDatas } = this.state;
    // rowDatas.push({
    //   title: '', point: '', endDate: '', id: '',
    // });

    // this.setState({
    //   rowDatas,
    // });
  };

  return (
    <div className="App">
      {rowDatas.map((rowData) => <AppTableRow id="tablerow" key={rowData.id} task={rowData} />)}
      <button type="button" name="add-button" onClick={addTask}>タスクを追加</button>
    </div>
  );
};

export default App;
