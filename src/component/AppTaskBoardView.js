import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppModalView from './AppModalView';
import { EDIT_TASK } from '../constants/action-types';
import '../css/AppTaskBoardView.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AppTaskBoardView = () => {
  const tasks = useSelector((state) => state.datas);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onStop = (e, data) => {
    const { x, y } = data;
    const payload = {
      id: e.target.id,
      position: { x, y },
    };

    dispatch({ type: EDIT_TASK, payload });
  };

  // const openModal = (event) => {
  //   const payload = {};
  //   // TODO:set edit modal task for store state
  //   payload.id = event.target.id;
  //   setIsOpen(true);
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickEvent = (event) => {
    console.log(event);
    const payload = {};
    // TODO:set edit modal task for store state
    payload.id = event.target.id;
    setIsOpen(true);
  };

  return (
    <div className="task-board">
      {tasks.map((task) => (
        <Draggable key={task.id} defaultPosition={task.position} onStop={onStop}>
          <div
            id={task.id}
            key={task.id}
            className={task.tag}
            onClick={handleClickEvent}
            onKeyDown={handleClickEvent}
            role="button"
            tabIndex={0}
          >
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
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AppModalView />
      </Modal>
    </div>
  );
};

export default AppTaskBoardView;
