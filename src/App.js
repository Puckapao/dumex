import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers";
import "./App.css";

import Main from "./components/Main";

class App extends Component {
   render() {
      const store = createStore(
         reducer,
         {} /* Initial State (Optional)*/,
         compose(
            applyMiddleware(ReduxThunk),
            //window.__REDUX_DEVTOOLS_EXTENSION__ &&
             //  window.__REDUX_DEVTOOLS_EXTENSION__()
         )
      );
      return (
         <Provider store={store}>
            <React.Fragment>
               <div className="App">
                  <Main />
               </div>
            </React.Fragment>
         </Provider>
      );
   }
}

export default App;
