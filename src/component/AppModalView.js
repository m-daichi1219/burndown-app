import React from 'react';
import { useSelector } from 'react-redux';

const AppModalView = () => {
  const task = useSelector((state) => state.currentTask);
  return (
    <>
      <p>AppModalView</p>
      <p>{task.id}</p>
    </>
  );
};
export default AppModalView;
