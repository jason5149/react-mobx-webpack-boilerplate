import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage } from '@utils/storage';

const render = (props, Comp) => {
  const hasLogin = getLocalStorage('token');
  
  if (hasLogin) {
    return <Comp {...props} />
  } else {
    return <Redirect to='/login' />
  }
}

const CustomerRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={props => render(props, component)} />
  );
};

CustomerRoute.propTypes = {
  component: PropTypes.any,
};

export default CustomerRoute;

