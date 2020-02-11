import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_VELOCITY, ADD_SPRINT, DELETE_SPRINT } from '../constants/action-types';
import '../css/AppSprintTable.css';

const AppSprintTable = () => {
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.id;
    payload.velocity = event.target.value;

    dispatch({ type: EDIT_VELOCITY, payload });
  };

  const addSprint = () => {
    dispatch({ type: ADD_SPRINT });
  };

  const deleteSprint = () => {
    dispatch({ type: DELETE_SPRINT });
  };

  return (
    <>
      <div className="app-sprint-table">
        <div className="app-sprint-col">
          <p>Period</p>
          <p>Velocity</p>
        </div>
        {sprints.map((sprint, index) => (
          <div className="app-sprint-col" id={sprint.id} key={sprint.id}>
            <p>{`Sprint${index}`}</p>
            <input type="number" id={sprint.id} value={sprint.velocity} onChange={handleChange} />
          </div>
        ))}
      </div>
      <button type="button" onClick={addSprint} className="sprint-plus-button">Sprintを追加</button>
      <button type="button" onClick={deleteSprint} disabled={sprints.length < 5} className="sprint-minus-button">Sprintを減らす</button>
    </>
  );
};

export default AppSprintTable;
