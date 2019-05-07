import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers";
import "./App.css";
import "./css/main.css";
// import "./css/main.scss";

import Main from "./components/Main";

class App extends Component {
   render() {
      const store = createStore(
         reducer,
         {} /* Initial State (Optional)*/,
         compose(
            applyMiddleware(ReduxThunk),
            // window.__REDUX_DEVTOOLS_EXTENSION__ &&
            //    window.__REDUX_DEVTOOLS_EXTENSION__()
         )
      );

      return (
         <Provider store={store}>
            <React.Fragment>
               <header className="site-header">
                  <div className="primary-header">
                     <div className="container">
                        <div className="site-header__wrapper">
                           <a href="#" className="menu-trigger">
                              <span />
                           </a>
                           <h1 className="site-logo">
                              <a className="site-logo__link" href="#">
                                 Nutricia Expert
                              </a>
                           </h1>
                           <nav className="site-nav">
                              <ul className="menu">
                                 <li className="menu-item">
                                    <a
                                       target="_blank"
                                       href="https://nutriciaexpert.com/testings"
                                    >
                                       ประเมินสุขภาพลูกน้อย
                                    </a>
                                 </li>
                                 <li className="menu-item">
                                    <a
                                       target="_blank"
                                       href="https://nutriciaexpert.com/faqs"
                                    >
                                       คำถามที่พบบ่อย
                                    </a>
                                 </li>
                                 <li className="menu-item">
                                    <a
                                       target="_blank"
                                       href="https://nutriciaexpert.com/talk-to-doctors"
                                    >
                                       ฝากคำถามถึงคุณหมอ
                                    </a>
                                 </li>
                                 <li className="menu-item">
                                    <a
                                       target="_blank"
                                       href="https://nutriciaexpert.com/expert-talks"
                                    >
                                       สาระน่ารู้จากคุณหมอ
                                    </a>
                                 </li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                  </div>
                  <div className="secondary-header">
                     <div className="container">
                        <ul className="menu">
                           <li className="menu-item nav-allergy-prevention">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/allergy-prevention"
                              >
                                 <i className="ico-allergy-prevention ico" />{" "}
                                 <span>มีโอกาสเสี่ยงแพ้โปรตีนนมวัว</span>
                              </a>
                           </li>
                           <li className="menu-item nav-allergy-treatment">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/allergy-treatment"
                              >
                                 <i className="ico-allergy-treatment ico" />{" "}
                                 <span>แพ้โปรตีนนมวัว</span>
                              </a>
                           </li>
                           <li className="menu-item nav-growth">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/growth"
                              >
                                 <i className="ico-growth ico" />{" "}
                                 <span>เติบโตต่ำกว่าเกณฑ์</span>
                              </a>
                           </li>
                           <li className="menu-item nav-digestion-discomfort">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/digestion-discomfort"
                              >
                                 <i className="ico-digestion-discomfort ico" />{" "}
                                 <span>ปัญหาอาการไม่สบายท้อง</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className="mobile-nav">
                     <div className="mobile-nav__section">
                        <ul className="menu">
                           <li className="menu-item nav-allergy-prevention">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/allergy-prevention"
                              >
                                 <i className="ico-allergy-prevention ico" />{" "}
                                 <span>มีโอกาสเสี่ยงแพ้โปรตีนนมวัว</span>
                              </a>
                           </li>
                           <li className="menu-item nav-allergy-treatment">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/allergy-treatment"
                              >
                                 <i className="ico-allergy-treatment ico" />{" "}
                                 <span>แพ้โปรตีนนมวัว</span>
                              </a>
                           </li>
                           <li className="menu-item nav-growth">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/growth"
                              >
                                 <i className="ico-growth ico" />{" "}
                                 <span>เติบโตต่ำกว่าเกณฑ์</span>
                              </a>
                           </li>
                           <li className="menu-item nav-digestion-discomfort">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/digestion-discomfort"
                              >
                                 <i className="ico-digestion-discomfort ico" />{" "}
                                 <span>ปัญหาอาการไม่สบายท้อง</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="mobile-nav__section">
                        <ul className="menu">
                           <li className="menu-item">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/testings"
                              >
                                 ประเมินสุขภาพลูกน้อย
                              </a>
                           </li>
                           <li className="menu-item">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/faqs"
                              >
                                 คำถามที่พบบ่อย
                              </a>
                           </li>
                           <li className="menu-item">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/talk-to-doctors"
                              >
                                 ฝากคำถามถึงคุณหมอ
                              </a>
                           </li>
                           <li className="menu-item">
                              <a
                                 target="_blank"
                                 href="https://nutriciaexpert.com/expert-talks"
                              >
                                 สาระน่ารู้จากคุณหมอ
                              </a>
                           </li>
                        </ul>
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
