import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppModalView from './AppModalView';
import { EDIT_TASK, SET_CURRENT_TASK } from '../constants/action-types';
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
  const [isDrag, setIsDrag] = useState(false);
  const dispatch = useDispatch();

  const onStop = (e, data) => {
    const { x, y } = data;
    const payload = {
      id: e.target.id,
      position: { x, y },
    };

    dispatch({ type: EDIT_TASK, payload });
  };

  const onDrag = () => {
    setIsDrag(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickEvent = (index) => {
    if (isDrag) {
      setIsDrag(false);
      return;
    }

    // Modal Open if never draggable
    const payload = index;
    dispatch({ type: SET_CURRENT_TASK, payload });
    setIsOpen(true);
  };

  return (
    <div className="task-board">
      {tasks.map((task, index) => (
        <Draggable
          key={task.id}
          defaultPosition={task.position}
          onStop={onStop}
          onDrag={onDrag}
        >
          <div
            id={task.id}
            key={task.id}
            className={task.tag}
            onClick={() => handleClickEvent(index)}
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
