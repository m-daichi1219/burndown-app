import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { EDIT_TASK } from '../constants/action-types';
import COLORS from '../constants/tag-colors';
import '../css/AppModalView.css';

const AppModalView = (props) => {
  const [del, setDelete] = useState(false);
  const { deleteModal, closeModal } = props;
  const currentNum = useSelector((state) => state.currentTask);
  const task = useSelector((state) => state.datas[currentNum]);
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.parentNode.id;
    payload[event.target.id] = event.target.value;

    dispatch({ type: EDIT_TASK, payload });
  };

  useEffect(() => {
    if (del) {
      const payload = {};
      payload.id = task.id;
      deleteModal(payload);
      setDelete(false);
    }
  }, [del, task.id, deleteModal]);

  return (
    <>
      <div id={task.id} className="modal-style">
        <button type="button" className="modal-close-button" onClick={closeModal}> </button>
        <label htmlFor="title" className="modal-label-style">
          TITLE
          <input type="text" id="title" value={task.title} onChange={handleChange} />
        </label>
        <label htmlFor="detail" className="modal-label-style">
          DETAIL
          <textarea type="text" id="detail" value={task.detail} onChange={handleChange} />
        </label>
        <label htmlFor="point" className="modal-label-style">
          POINT
          <input type="number" id="point" value={task.point} onChange={handleChange} />
        </label>
        <label htmlFor="sprint" className="modal-label-style">
          SPRINT
          <select id="sprint" onChange={handleChange} value={task.sprint}>
            <option value=""> </option>
            {sprints.map((sprint, index) => (
              <option value={index + 1} key={sprint.id}>{`Sprint${index + 1}`}</option>))}
          </select>
        </label>
        <label htmlFor="sprint" className="modal-label-style">
          COLOR
          <select id="tag" onChange={handleChange} value={task.tag}>
            {COLORS.map((color) => (
              <option value={color.tag} key={color.tag}>{color.name}</option>))}
          </select>
        </label>
        <button type="button" onClick={() => setDelete(true)}>削除</button>
      </div>
    </>
  );
};

AppModalView.propTypes = {
  deleteModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AppModalView;
