import React, { Component } from "react";
import { connect } from "react-redux";
import { inputMumNameAction } from "../actions";

import InputMumName from "./pages/InputMumName";
import YouOrWho from "./pages/YouOrWho";
import ChooseYourChild from "./pages/ChooseYourChild";
import PregnantOrHaveChild from "./pages/PregnantOrHaveChild";
import PregnantDeadline from "./pages/PregnantDeadline";
import ChildInfo from "./pages/ChildInfo";
import ChildInfo2 from "./pages/ChildInfo2";
import ChildInfo3 from "./pages/ChildInfo3";
import AllergyOrNot from "./pages/AllergyOrNot";
import MainQuiz from "./pages/MainQuiz";
import Result from "./pages/Result";
import CallBackLater from "./pages/CallBackLater";

class Main extends Component {
   render() {
      switch (this.props.step) {
         case "1":
            return <InputMumName />;
         case "2":
            return <YouOrWho />;
         case "3":
            return <ChooseYourChild />;
         case "4":
            return <PregnantOrHaveChild />;
         case "5.1A":
            return <PregnantDeadline />;
         case "5.2A":
            return <ChildInfo />;
         case "5.2B":
            return <ChildInfo2 />;
         case "5.2C":
            return <ChildInfo3 />;
         case "6":
            return <AllergyOrNot />;
         case "7":
            return <MainQuiz />;
         case "8":
            return <Result />;
         case "9":
            return <CallBackLater />;
         default:
            return (
               <React.Fragment>
                  <h1>Default: Page not found</h1>
               </React.Fragment>
            );
      }
   }
}

const mapStateToProps = state => {
   return { step: state.form.step };
};

export default connect(
   mapStateToProps,
   { inputMumNameAction }
)(Main);
