import React, { Component } from "react";
import { connect } from "react-redux";

import {
   changeStepAction
} from "../../actions";

import mom from "../../img/mom.svg";
import dad from "../../img/dad.svg";
import kid from "../../img/baby.svg";

import momAct01 from "../../video/mom_act_01_movecrop.mp4";
import momAct02 from "../../video/mom_act_02_movecrop.mp4";
import momAct03 from "../../video/mom_act_03_movecrop.mp4";
import momAct04 from "../../video/mom_act_04_movecrop.mp4";
import momAct05 from "../../video/mom_act_05_movecrop.mp4";
import momAct06 from "../../video/mom_act_06_movecrop.mp4";
import momAct07 from "../../video/mom_act_07_movecrop.mp4";
import momAct08 from "../../video/mom_act_08_movecrop.mp4";

import dadAct01 from "../../video/dad_act_01_movecrop.mp4";
import dadAct02 from "../../video/dad_act_02_movecrop.mp4";
import dadAct03 from "../../video/dad_act_03_movecrop.mp4";
import dadAct04 from "../../video/dad_act_04_movecrop.mp4";
import dadAct05 from "../../video/dad_act_05_movecrop.mp4";
import dadAct06 from "../../video/dad_act_06_movecrop.mp4";
import dadAct07 from "../../video/dad_act_07_movecrop.mp4";
import dadAct08 from "../../video/dad_act_08_movecrop.mp4";

import kidAct01 from "../../video/kid_act_01_movecrop.mp4";
import kidAct02 from "../../video/kid_act_02_movecrop.mp4";
import kidAct03 from "../../video/kid_act_03_movecrop.mp4";
import kidAct04 from "../../video/kid_act_04_movecrop.mp4";
import kidAct05 from "../../video/kid_act_05_movecrop.mp4";
import kidAct06 from "../../video/kid_act_06_movecrop.mp4";
import kidAct07 from "../../video/kid_act_07_movecrop.mp4";
import kidAct08 from "../../video/kid_act_08_movecrop.mp4";

class SaveResult extends Component {
   state = {
      mother_asthma: "",
      mother_milk_intolerance: "",
      mother_rhinitis: "",
      mother_atopic_dermatitis: "",
      mother_urticaria: "",
      mother_drug: "",
      mother_food: "",
      mother_conjunctivitis: "",

      father_asthma: "",
      father_milk_intolerance: "",
      father_rhinitis: "",
      father_atopic_dermatitis: "",
      father_urticaria: "",
      father_drug: "",
      father_food: "",
      father_conjunctivitis: "",

      brother_asthma: "",
      brother_milk_intolerance: "",
      brother_rhinitis: "",
      brother_atopic_dermatitis: "",
      brother_urticaria: "",
      brother_drug: "",
      brother_food: "",
      brother_conjunctivitis: ""
   };

   componentDidMount = () => {
      this.setState(this.props.AllergyPrevention);
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   choiceUpdate = (thaiTitle, stateTitle, video) => {
      return (
         <React.Fragment>
            <div className="quiz-block__item">
               <h4 className="quiz-block__title">{thaiTitle}</h4>
               <div className="quiz-wrapper">
                  <div className="quiz-wrapper__video">
                     <video src={video} autoPlay loop muted playsInline />
                  </div>
                  {this.subChoiceUpdate(stateTitle)}
               </div>
            </div>
         </React.Fragment>
      );
   };

   handleNothing = e => {
      // do nothing
   };

   subChoiceUpdate = stateTitle => {
      return (
         <React.Fragment>
            <ul className="quiz">
               <li className="quiz__item">
                  <label className="quiz__trigger" title="เป็น">
                     <input
                        type="radio"
                        name={stateTitle}
                        value="yes"
                        onChange={this.handleNothing}
                        checked={this.state[`${stateTitle}`] === "yes"}
                     />
                     <span className="quiz__icon quiz__icon_yes" />
                  </label>
               </li>
               <li className="quiz__item">
                  <label className="quiz__trigger" title="ไม่เป็น">
                     <input
                        type="radio"
                        name={stateTitle}
                        value="no"
                        onChange={this.handleNothing}
                        checked={this.state[`${stateTitle}`] === "no"}
                     />
                     <span className="quiz__icon quiz__icon_no" />
                  </label>
               </li>
               <li className="quiz__item">
                  <label className="quiz__trigger" title="ไม่แน่ใจ">
                     <input
                        type="radio"
                        name={stateTitle}
                        value="not-sure"
                        onChange={this.handleNothing}
                        checked={this.state[`${stateTitle}`] === "not-sure"}
                     />
                     <span className="quiz__icon quiz__icon_not-sure" />
                  </label>
               </li>
            </ul>
         </React.Fragment>
      );
   };

   mother = () => {
      return (
         <React.Fragment>
            <div className="people">
               <div className="people__avatar">
                  <img src={mom} alt="mom" />
                  <span className="name">คุณแม่</span>
               </div>
            </div>

            <div className="quiz-block">
               {this.choiceUpdate("หอบหืด", "mother_asthma", momAct01)}
               {this.choiceUpdate(
                  "แพ้นมวัว",
                  "mother_milk_intolerance",
                  momAct02
               )}
               {this.choiceUpdate("แพ้อากาศ", "mother_rhinitis", momAct03)}
               {this.choiceUpdate(
                  "ผื่นแพ้ผิวหนัง",
                  "mother_atopic_dermatitis",
                  momAct04
               )}
               {this.choiceUpdate("ลมพิษ", "mother_urticaria", momAct05)}
               {this.choiceUpdate("แพ้ยา", "mother_drug", momAct06)}
               {this.choiceUpdate("แพ้อาหาร", "mother_food", momAct07)}
               {this.choiceUpdate(
                  "เยื่อบุตาอักเสบจากภูมิแพ้",
                  "mother_conjunctivitis",
                  momAct08
               )}
            </div>
         </React.Fragment>
      );
   };

   father = () => {
      return (
         <React.Fragment>
            <div className="people">
               <div className="people__avatar">
                  <img src={dad} alt="father" />
                  <span className="name">คุณพ่อ</span>
               </div>
            </div>

            <div className="quiz-block">
               {this.choiceUpdate("หอบหืด", "father_asthma", dadAct01)}
               {this.choiceUpdate(
                  "แพ้นมวัว",
                  "father_milk_intolerance",
                  dadAct02
               )}
               {this.choiceUpdate("แพ้อากาศ", "father_rhinitis", dadAct03)}
               {this.choiceUpdate(
                  "ผื่นแพ้ผิวหนัง",
                  "father_atopic_dermatitis",
                  dadAct04
               )}
               {this.choiceUpdate("ลมพิษ", "father_urticaria", dadAct05)}
               {this.choiceUpdate("แพ้ยา", "father_drug", dadAct06)}
               {this.choiceUpdate("แพ้อาหาร", "father_food", dadAct07)}
               {this.choiceUpdate(
                  "เยื่อบุตาอักเสบจากภูมิแพ้",
                  "father_conjunctivitis",
                  dadAct08
               )}
            </div>
         </React.Fragment>
      );
   };

   brother = () => {
      return (
         <React.Fragment>
            <div className="people">
               <div className="people__avatar">
                  <img src={kid} alt="brother" />
                  <span className="name">พี่น้อง</span>
               </div>
            </div>

            <div className="quiz-block">
               {this.choiceUpdate("หอบหืด", "brother_asthma", kidAct01)}
               {this.choiceUpdate(
                  "แพ้นมวัว",
                  "brother_milk_intolerance",
                  kidAct02
               )}
               {this.choiceUpdate("แพ้อากาศ", "brother_rhinitis", kidAct03)}
               {this.choiceUpdate(
                  "ผื่นแพ้ผิวหนัง",
                  "brother_atopic_dermatitis",
                  kidAct04
               )}
               {this.choiceUpdate("ลมพิษ", "brother_urticaria", kidAct05)}
               {this.choiceUpdate("แพ้ยา", "brother_drug", kidAct06)}
               {this.choiceUpdate("แพ้อาหาร", "brother_food", kidAct07)}
               {this.choiceUpdate(
                  "เยื่อบุตาอักเสบจากภูมิแพ้",
                  "brother_conjunctivitis",
                  kidAct08
               )}
            </div>
         </React.Fragment>
      );
   };

   render() {
      return (
         <React.Fragment>
            <p className="backButton">
               <button
                  className="button button_solid backButton_small"
                  onClick={this.changeStep.bind(this, "8")}
               >
                  กลับ
               </button>
            </p>
            <h1 className="header">
               ผลทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว
            </h1>
            {this.mother()}
            {this.father()}
            {this.brother()}
            <div style={{height:'4px'}}></div>
            <p>
               <a
                  className="button button_solid"
                  href="https://nutriciaexpert.com/"
               >
                  กลับสู่หน้าแรก
               </a>
            </p>
            <div style={{height:'4px'}}></div>
            <p>
               <a
                  className="button button_solid"
                  href="/"
               >
                  ทำแบบทดสอบอีกครั้ง
               </a>
            </p>
            <div className="form-step">
               <a
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "8")}
               >
                  กลับ
               </a>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      AllergyPrevention: state.form.AllergyPrevention
   };
};

export default connect(mapStateToProps, { changeStepAction })(SaveResult);
