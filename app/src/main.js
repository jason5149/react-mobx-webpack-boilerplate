import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import stores from '@models';
import '@utils/polyfill';
import '@styles/index.scss';
import Root from './Root';

const init = () => {
  render(
    <Provider { ...stores }>
      <Root />
    </Provider>,
    document.getElementById('root'),
  );
};

init();
