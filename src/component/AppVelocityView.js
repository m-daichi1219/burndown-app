import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_NORMARIZED_VELOCITY, EDIT_VELOCITY } from '../constants/action-types';
import '../css/AppVelocityView.css';

// TODO:NormarizedVelocity is averaged over the last 3 sprints

const AppVelocityView = () => {
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const calcPlanningPoint = (index) => {
    if (index === 0) return 0;
    return sprints[index - 1].normarizedVelocity * sprints[index].planningCapacity;
  };

  const calcNormarizedVelocity = (sprint, index) => {
    if (!sprint.velocity || !sprint.resultCapacity) return 'Not set Velocity or ResultCapacity';

    const normarizedVelocity = Math.round(sprint.velocity
      * (10 / sprint.resultCapacity) * 10) / 100;
    const payload = { sprint: { ...sprint, normarizedVelocity }, index };

    dispatch({ type: EDIT_NORMARIZED_VELOCITY, payload });
    return normarizedVelocity;
  };

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.parentNode.id;
    payload[event.target.id] = event.target.value;

    console.log('--handleChange:payload--');
    console.log(payload);
    console.log('------------------------');
    dispatch({ type: EDIT_VELOCITY, payload });
  };

  return (
    <div className="velocity-layout">
      <div className="app-table-header">
        <div className="cell">
          Start
        </div>
        <div className="cell">
          End
        </div>
        <div className="cell">
          Sprint
        </div>
        <div className="cell">
          PlanningPoint
        </div>
        <div className="cell">
          PlanningCapacity
        </div>
        <div className="cell">
          ResultPoint
        </div>
        <div className="cell">
          ResultCapacity
        </div>
        <div className="cell">
          NormarizedVelocity
        </div>
      </div>
      <div className="app-table-body">
        {sprints.map((sprint, index) => (
          <div className="app-table-row" id={sprint.id} key={sprint.id}>
            <div className="cell">
              <input type="date" value={sprint.start} readOnly />
            </div>
            <div className="cell">
              <input type="date" value={sprint.end} readOnly />
            </div>
            <div className="cell">
              <p>
                {`Sprint${index}`}
              </p>
            </div>
            <div className="cell">
              {calcPlanningPoint(index)}
            </div>
            <div className="cell">
              <input type="number" step="0.01" id="planningCapacity" value={Number(sprint.planningCapacity)} onChange={handleChange} />
            </div>
            <div className="cell">
              <p>{sprint.velocity}</p>
            </div>
            <div className="cell">
              <input type="number" step="0.01" id="resultCapacity" value={Number(sprint.resultCapacity)} onChange={handleChange} />
            </div>
            <div className="cell">
              {calcNormarizedVelocity(sprint, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppVelocityView;
