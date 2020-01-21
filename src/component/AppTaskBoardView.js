import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EDIT_TASK } from '../constants/action-types';
import '../css/AppTaskBoardView.css';

// TODO: position setting

const AppTaskBoardView = () => {
  const tasks = useSelector((state) => state.datas);
  const dispatch = useDispatch();

  const onStop = (e, data) => {
    const { x, y } = data;
    const payload = {
      id: e.target.id,
      position: { x, y },
    };

    dispatch({ type: EDIT_TASK, payload });
  };

  return (
    <div className="task-board">
      {tasks.map((task) => (
        <Draggable key={task.id} defaultPosition={task.position} onStop={onStop}>
          <div id={task.id} key={task.id} className={task.tag}>
            {task.title}
            <div className="point-area">
              {task.sprint && (
                <FontAwesomeIcon icon={['far', 'check-circle']} className="check-icon" />
              )}
              {task.point}
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default AppTaskBoardView;
