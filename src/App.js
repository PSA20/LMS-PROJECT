import React from 'react';
import "./App.css";
import { Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router-dom';

import Main from "./components/Main";
import 'antd/dist/antd.css';
// import Test from './components/Test.js';
import MyTest from "./components/MyTest/MyTest";
import SubmitTest from "./components/SubmitTest/SubmitTest";


function App() {
  return (
      <Switch>
      <Route path="/" exact component={Main} />
      {/* <Route path="/test" component={Test} /> */}
      <Route path="/test123" component={MyTest} />
      <Route path="/submittest" component={SubmitTest} />
      </Switch>
  )
}

export default withRouter(App);
