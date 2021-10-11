import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import 'antd/dist/antd.css';
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <  Provider store={store}>
      <PersistGate  persistor={persistor}>
    <BrowserRouter >
       <App/>
    </BrowserRouter>
   </PersistGate>
  </Provider>,
  document.getElementById('root')
);
