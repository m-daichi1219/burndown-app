import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import EDIT_TASK from '../constants/action-types';
import '../css/AppTableRow.css';

const AppTableRow = (props) => {
  const { task } = props;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.parentNode.id;
    payload[event.target.id] = event.target.value;

    dispatch({ type: EDIT_TASK, payload });
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
        <input type="date" id="endDate" value={task.endDate} onChange={handleChange} />
      </div>
      <button type="button" onClick={handleChange}>Button</button>
    </div>
  );
};

// const AppTableRow = ({ rowData }) => {
//   const {
//     title, point, endDate, id,
//   } = rowData;
// };

AppTableRow.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    point: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppTableRow;
