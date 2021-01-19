import React from 'react';
import "./App.css";
import { Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router-dom';

import Main from "./components/Main";
import 'antd/dist/antd.css';
import Test from './components/Test.js';


function App() {
  return (
      <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/test" component={Test} />
      </Switch>
  )
}

export default withRouter(App);
