import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './containers/App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers/store'
import "bootstrap/dist/css/bootstrap.css"


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>

      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
