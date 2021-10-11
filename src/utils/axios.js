import axios from 'axios';
import store from '../store';

const Axios = axios.create({
  baseURL: 'http://backend.edugateway.uz/api/v1/',
  timeout: 30000,
  timeoutErrorMessage: 'Connection is lost. Server not responded',
});

http: Axios.interceptors.request.use(
  (configs) => {
    const token = store.getState().payload.access;
    const token2 = localStorage.getItem('acces')
    console.log(
      token2
    );
    configs.headers.Authorization = token ? `JWT ${token}` : `JWT ${token2}` ?  `JWT ${token2}` : '';
    return configs;
  },
  (err) => {
    console.log(err.response);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default Axios;
