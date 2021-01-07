import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {  User } from "./reducers/User";
import {  Questions } from "./reducers/Questions";
import {  options } from "./reducers/Option";

export const ConfigureStore = () => {
const store = createStore(combineReducers({
    user: User,
    question: Questions,
    option:options
}, applyMiddleware(thunk, logger)));

return store;
};

