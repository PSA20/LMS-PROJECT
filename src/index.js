import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ConfigureStore } from "./redux/ConfigureStore";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import {  User } from "./redux/reducers/User";
import {  Questions } from "./redux/reducers/Questions";
import {  options } from "./redux/reducers/Option";
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
  user: User,
    question: Questions,
    option: options
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
