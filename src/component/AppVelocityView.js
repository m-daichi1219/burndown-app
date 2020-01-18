import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_VELOCITY } from '../constants/action-types';
import '../css/AppVelocityView.css';

const AppVelocityView = () => {
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();


  const calcNormarizedVelocity = (sprint) => {
    let normarizedVelocity = '';

    if (sprint.velocity || sprint.resultCapacity) {
      normarizedVelocity = Math.round(sprint.velocity
        * (10 / sprint.resultCapacity) * 10) / 100;
    }

    return Number.isFinite(normarizedVelocity) ? normarizedVelocity : '';
  };

  const calcAverageVelocity = (sprint, index) => {
    if (!sprint.velocity || !sprint.resultCapacity) return '';

    const normarizedVelocity = calcNormarizedVelocity(sprint);
    let averageVelocity;
    if (index !== 0) {
      let addCnt = 0;
      const slicedSprints = sprints.slice(0, index).reverse();
      const addNormarized = slicedSprints.reduce((acc, slicedSprint) => {
        if (addCnt === 2) return acc;

        addCnt += 1;
        return acc + calcNormarizedVelocity(slicedSprint);
      }, 0);
      averageVelocity = Math.round(((addNormarized + normarizedVelocity)
        / (addCnt + 1)) * 100) / 100;
      addCnt = 0;
    } else {
      averageVelocity = normarizedVelocity;
    }

    return averageVelocity;
  };

  const calcPlanningPoint = (index) => {
    if (index === 0) return 0;
    const average = calcAverageVelocity(sprints[index - 1], index - 1);
    return Math.round((average * sprints[index].planningCapacity) * 100) / 100;
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
        <div className="cell">
          AveregeVelocity
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
            <div className="cell">
              {calcAverageVelocity(sprint, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppVelocityView;
