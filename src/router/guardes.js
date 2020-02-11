/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = (props) => {
  // 前処理


  // 条件分岐
  if (false) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...props} />
  );
};

export default GuardedRoute;
