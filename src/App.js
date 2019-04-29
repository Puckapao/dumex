import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers";
import "./App.css";
import "./css/main.css";
import "./css/main.scss";

import Main from "./components/Main";

class App extends Component {
   render() {
      const store = createStore(
         reducer,
         {} /* Initial State (Optional)*/,
         compose(
            applyMiddleware(ReduxThunk)
            //window.__REDUX_DEVTOOLS_EXTENSION__ &&
            //  window.__REDUX_DEVTOOLS_EXTENSION__()
         )
      );
      return (
         <Provider store={store}>
            <React.Fragment>
               <header className="site-header">
                  <div className="container">
                     <div className="site-header__wrapper">
                        <h1 className="site-logo">
                           <a className="site-logo__link" href="#">
                              Nutricia Expert
                           </a>
                        </h1>
                        <nav className="site-nav">
                           <ul className="menu">
                              <li className="menu-item">
                                 <a href="#">ประเมินสุขภาพลูกน้อย</a>
                              </li>
                              <li className="menu-item">
                                 <a href="#">คำถามที่พบบ่อย</a>
                              </li>
                              <li className="menu-item">
                                 <a href="#">ฝากคำถามถึงคุณหมอ</a>
                              </li>
                              <li className="menu-item">
                                 <a href="#">สาระน่ารู้จากคุณหมอ</a>
                              </li>
                           </ul>
                        </nav>
                     </div>
                  </div>
               </header>
               <div className="site-content">
                  <div className="app">
                     <Main />
                  </div>
               </div>
               <footer className="site-footer">
                  <div className="container">
                     <div className="site-footer__wrapper">
                        <div className="call24">
                           <a className="call24__link" href="tel:+6627403456">
                              <span>Careline</span> 0-2740-3456
                           </a>
                        </div>
                        <div className="contact-specialist">
                           <a
                              href="https://nutriciaexpert.com/careline"
                              target="_blank"
                           >
                              ติดต่อผู้เชี่ยวชาญ
                           </a>
                        </div>
                        <div className="copyrights">
                           &copy; 2019 Dumex (Thailand) Ltd. All Rights
                           Reserved.
                        </div>
                     </div>
                  </div>
               </footer>
            </React.Fragment>
         </Provider>
      );
   }
}

export default App;
