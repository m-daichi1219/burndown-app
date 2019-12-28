import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_VELOCITY, ADD_SPRINT } from '../constants/action-types';
import '../css/AppTableCol.css';

const AppTableCol = () => {
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.id;
    payload.velocity = event.target.value;

    dispatch({ type: EDIT_VELOCITY, payload });
  };

  const handleClick = () => {
    dispatch({ type: ADD_SPRINT });
  };

  return (
    <>
      <div className="app-table-col">
        {sprints.map((sprint, index) => (
          <div className="col" id="col">
            <p>{`Sprint${index}`}</p>
            <input type="number" id={sprint.id} value={sprint.velocity} onChange={handleChange} />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleClick}>Sprintを追加</button>
    </>
  );
};

export default AppTableCol;
