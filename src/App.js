import "./App.css";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import 'antd/dist/antd.css';

const store= ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div> <Main /></div>
      
      </BrowserRouter>
      
    </Provider>
  );
}

export default App;
