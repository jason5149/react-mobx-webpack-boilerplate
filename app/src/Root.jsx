import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import RouteConfig from '@components/RouteConfig';
import routes from '@routes';

class Root extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <RouteConfig data={routes} />
        </Router>
      </ErrorBoundary>
    );
  }
};

export default Root;
