import axios from 'axios';
import * as CONST from '@utils/const';
import Catcher from '@utils/catcher';
import { startLoading, stopLoading } from '@utils/loading';

window.cancelTokenList = [];

const instance = axios.create({
  timeout: CONST.REQUEST_TIMEOUT,
});

const requestHandler = (config) => {
  startLoading(config);

  const source = axios.CancelToken.source();

  window.cancelTokenList.push(source);
  config.cancelToken = source.token;

  return config;
};

const requestErroHandler = (error) => {
  Promise.reject(error);
};

const responseHandler = (response) => {
  stopLoading();

  window.cancelTokenList = window.cancelTokenList
    .filter((item) => item.token !== response.config.cancelToken);

  const { status } = response;

  if (status !== 200) Catcher(response);

  return response;
};

const responseErrorHandler = (error) => {
  console.log(error);

  stopLoading();

  Catcher(error.response, true);
};

instance.interceptors.request.use(requestHandler, requestErroHandler);
instance.interceptors.response.use(responseHandler, responseErrorHandler);

export default instance;
