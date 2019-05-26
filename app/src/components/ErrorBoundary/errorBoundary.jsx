import React, { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { children } = this.props;
    const {
      hasError,
      error,
      info,
    } = this.state;

    if (hasError) {
      return (
        <div className='error-wrapper'>
          {error && error.toString()}
          {info && info.componentStack}
        </div>
      );
    }

    return children;
  }
};

export default ErrorBoundary;
