import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_NORMARIZED_VELOCITY, EDIT_VELOCITY } from '../constants/action-types';
import '../css/AppVelocityView.css';

const AppVelocityView = () => {
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const calcPlanningPoint = (index) => {
    if (index === 0) return 0;
    return Math.round((sprints[index - 1].normarizedVelocity
      * sprints[index].planningCapacity) * 100) / 100;
  };

  const calcNormarizedVelocity = (sprint, index) => {
    if (!sprint.velocity || !sprint.resultCapacity) return '';

    let normarizedVelocity = Math.round(sprint.velocity
      * (10 / sprint.resultCapacity) * 10) / 100;
    if (index !== 0) {
      let addCnt = 0;
      const slicedSprints = sprints.slice(0, index);
      const addNormarized = slicedSprints.reduce((acc, slicedSprint) => {
        if (addCnt === 2) return acc;
        if (slicedSprint.normarizedVelocity) {
          addCnt += 1;
          return acc + slicedSprint.normarizedVelocity;
        }
        return acc;
      }, 0);

      normarizedVelocity = Math.round(((addNormarized + normarizedVelocity)
        / (addCnt + 1)) * 100) / 100;
      addCnt = 0;
    }

    const payload = { sprint: { ...sprint, normarizedVelocity }, index };
    dispatch({ type: EDIT_NORMARIZED_VELOCITY, payload });
    return normarizedVelocity;
  };

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.parentNode.id;
    payload[event.target.id] = event.target.value;

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
              <input type="date" id="start" value={sprint.start} onChange={handleChange} />
            </div>
            <div className="cell">
              <input type="date" id="end" value={sprint.end} onChange={handleChange} />
            </div>
            <div className="cell">
              {`Sprint${index}`}
            </div>
            <div className="cell">
              {calcPlanningPoint(index)}
            </div>
            <div className="cell">
              <input type="number" step="0.01" id="planningCapacity" value={Number(sprint.planningCapacity)} onChange={handleChange} />
            </div>
            <div className="cell">
              {sprint.velocity}
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
