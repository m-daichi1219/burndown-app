import React from 'react';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import '../css/AppTaskBoardView.css';

const AppTaskBoardView = () => {
  const tasks = useSelector((state) => state.datas);

  // const onStart = (e, data) => {
  //   console.log('onStart!');
  //   console.log(e);
  //   console.log(data);
  // };

  // const onDrag = (e, data) => {
  //   console.log('onDrag!');
  //   console.log(e);
  //   console.log(data);
  // };

  // const onStop = (e, data) => {
  //   console.log('onStop!');
  //   console.log(e);
  //   console.log(data);
  // };

  return (
    <div className="task-board">
      {tasks.map((task) => (
        <Draggable>
          <div key={task.id} className={task.tag}>
            {task.title}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default AppTaskBoardView;
