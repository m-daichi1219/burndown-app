import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { EDIT_TASK, DELETE_TASK } from '../constants/action-types';
import '../css/AppTaskTable.css';

const AppTaskTable = (props) => {
  const { task } = props;
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.parentNode.id;
    payload[event.target.id] = event.target.value;

    dispatch({ type: EDIT_TASK, payload });
  };

  const handleDelete = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.id;
    dispatch({ type: DELETE_TASK, payload });
  };

  return (
    <div draggable="true" className="row" id={task.id}>
      <div className="cell">
        <input type="text" id="title" value={task.title} onChange={handleChange} />
      </div>
      <div className="cell">
        <input type="number" id="point" value={task.point} onChange={handleChange} />
      </div>
      <div className="cell">
        <select id="sprint" onChange={handleChange} value={task.sprint}>
          <option value=""> </option>
          {sprints.map((sprint, index) => (<option value={index + 1} key={sprint.id}>{`Sprint${index + 1}`}</option>))}
        </select>
      </div>
      <button type="button" onClick={handleDelete}>削除</button>
    </div>
  );
};

AppTaskTable.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    point: PropTypes.string.isRequired,
    sprint: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppTaskTable;
