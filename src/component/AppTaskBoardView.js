import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppModalView from './AppModalView';
import {
  EDIT_TASK, SET_CURRENT_TASK, DELETE_TASK, ADD_TASK,
} from '../constants/action-types';
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

  const deleteModal = (payload) => {
    closeModal();
    dispatch({ type: DELETE_TASK, payload });
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

  const addTask = () => {
    dispatch({ type: ADD_TASK });
  };

  return (
    <div className="task-board">

      {/* controller */}
      <div className="borad-controller">
        <div
          onKeyDown={handleClickEvent}
          role="button"
          tabIndex={0}
          className="controller-item"
          onClick={addTask}
        >
          タスクの追加
        </div>
      </div>

      {/* Tag Items */}
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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AppModalView deleteModal={deleteModal} closeModal={closeModal} />
      </Modal>

    </div>
  );
};

export default AppTaskBoardView;
