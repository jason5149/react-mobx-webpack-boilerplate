import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from '@utils/storage';

const render = (props, Comp) => {
  const hasLogin = getLocalStorage('token');
  
  if (hasLogin) {
    return <Comp { ...props } />
  } else {
    return <Redirect to='/login' />
  }
}

export default ({ component: comp, ...rest }) => {
  return (
    <Route { ...rest } render={ props => render(props, comp) } />
  );
};
