import React from 'react';
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import Main from "./components/Main";
import 'antd/dist/antd.css';
import Test from './components/Test.js';

const store= ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/test" component={Test} />
      </Switch>
      
      </BrowserRouter>
      
    </Provider>
  );
}

export default App;
