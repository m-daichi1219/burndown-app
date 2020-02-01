import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_TASK, DELETE_TASK } from '../constants/action-types';
import COLORS from '../constants/tag-colors';

const AppModalView = () => {
  // const task = useSelector((state) => state.currentTask);
  const currentNum = useSelector((state) => state.currentTask);
  const task = useSelector((state) => state.datas[currentNum]);
  const sprints = useSelector((state) => state.sprints);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.id;
    payload[event.target.id] = event.target.value;

    dispatch({ type: EDIT_TASK, payload });
  };

  const handleDelete = (event) => {
    const payload = {};
    payload.id = event.target.parentNode.id;
    dispatch({ type: DELETE_TASK, payload });
  };

  return (
    <div id={task.id ? task.id : '-'}>
      <input type="text" id="title" value={task.title} onChange={handleChange} />
      <input type="number" id="point" value={task.point} onChange={handleChange} />
      <select id="sprint" onChange={handleChange} value={task.sprint}>
        <option value=""> </option>
        {sprints.map((sprint, index) => (
          <option value={index + 1} key={sprint.id}>{`Sprint${index + 1}`}</option>))}
      </select>
      <select id="tag" onChange={handleChange} value={task.tag}>
        {COLORS.map((color) => (
          <option value={color.tag} key={color.tag}>{color.name}</option>))}
      </select>
      <button type="button" onClick={handleDelete}>削除</button>
    </div>
  );
};
export default AppModalView;
