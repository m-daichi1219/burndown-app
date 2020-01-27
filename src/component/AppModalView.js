import React from 'react';
import { useSelector } from 'react-redux';

const AppModalView = () => {
  const data = useSelector((state) => state.datas[0]);
  return (
    <>
      <p>AppModalView</p>
      <p>{data.id}</p>
    </>
  );
};
export default AppModalView;
