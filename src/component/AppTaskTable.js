import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../constants/action-types';
import COLORS from '../constants/tag-colors';
import '../css/AppTaskTable.css';

const AppTaskTable = () => {
  const tasks = useSelector((state) => state.datas);
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
    payload.id = event.target.parentNode.parentNode.id;
    dispatch({ type: DELETE_TASK, payload });
  };

  const handleClick = () => {
    dispatch({ type: ADD_TASK });
  };

  return (
    <>
      <div className="app-task-table">
        <div className="app-table-header">
          <div className="cell">
            タスク名
          </div>
          <div className="cell">
            ポイント
          </div>
          <div className="cell">
            完了Sprint
          </div>
          <div className="cell">
            色
          </div>
          <div className="cell">
            削除
          </div>
        </div>
        <div className="app-table-body">
          {tasks.map((task) => (
            <div draggable="true" className="app-table-row" id={task.id} key={task.id}>
              <div className="cell">
                <input type="text" id="title" value={task.title} onChange={handleChange} />
              </div>
              <div className="cell">
                <input type="number" id="point" value={task.point} onChange={handleChange} />
              </div>
              <div className="cell">
                <select id="sprint" onChange={handleChange} value={task.sprint}>
                  <option value=""> </option>
                  {sprints.map((sprint, index) => (
                    <option value={index + 1} key={sprint.id}>{`Sprint${index + 1}`}</option>))}
                </select>
              </div>
              <div className="cell">
                <select id="tag" onChange={handleChange} value={task.tag}>
                  {COLORS.map((color) => (
                    <option value={color.tag} key={color.tag}>{color.name}</option>))}
                </select>
              </div>
              <div className="cell">
                <button type="button" onClick={handleDelete}>削除</button>
              </div>
            </div>
          ))}
        </div>
        <div className="app-table-footer">
          <button type="button" name="add-button" onClick={handleClick}>タスクを追加</button>
        </div>
      </div>
    </>
  );
};

export default AppTaskTable;
