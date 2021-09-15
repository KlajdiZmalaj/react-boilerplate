import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { store } from 'redux-store/store';
import { Provider } from 'react-redux';
import App from './App';
import '../src/assets/defaults/default.scss'
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const IndexCMP = hot(Root);
ReactDOM.render(<IndexCMP />, document.getElementById('root'));
