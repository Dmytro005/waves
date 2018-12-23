import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import './styles/styles.css';
import Routes from './routes';
import Reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(
  createStore
);

const App = () => {
  return (
    <Provider
      store={createStoreWithMiddleware(
        Reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <BrowserRouter onUpdate={() => alert('ddd')}>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
