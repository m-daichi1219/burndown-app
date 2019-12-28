import React from 'react';
import { useSelector } from 'react-redux';
import '../css/AppTableCol.css';

const AppTableCol = () => {
  const sprints = useSelector((state) => state.sprints);
  console.log(sprints);

  return (
    <div className="app-table-col">
      {sprints.map((sprint) => (
        <div className="col" id="col">
          <p>{sprint.sprint}</p>
          <input type="number" id="point" value={sprint.velocity} />
        </div>
      ))}
    </div>
  );
};

export default AppTableCol;
