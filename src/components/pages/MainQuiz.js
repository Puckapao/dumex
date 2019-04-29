import React, { Component } from "react";
import { connect } from "react-redux";
import { mainQuizAction, changeStepAction } from "../../actions";

// import { Radio, Button } from "../reuse";
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

class MainQuiz extends Component {
   constructor(props) {
      super(props);
      this.myRef = React.createRef();
   }

   state = {
      member: "mother",

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

   componentDidMount() {
      const allSyndrome = { ...this.props.AllergyPrevention };

      this.setState(allSyndrome);
   }

   changeMember = updateMember => {
      this.setState({ member: updateMember });
   };

   handleChange = e => {
      const target = e.target.name;
      this.setState({ [e.target.name]: e.target.value }, () => {
         //console.log(this.state[target]);
      });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);

      // Todo: Form Validate ****

      this.props.mainQuizAction(this.state, this.props.children_id);
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        checked={this.state[`${stateTitle}`] === "not-sure"}
                     />
                     <span className="quiz__icon quiz__icon_not-sure" />
                  </label>
               </li>
            </ul>
         </React.Fragment>
      );
   };

   render() {
      switch (this.state.member) {
         case "father":
            return (
               <React.Fragment>
                  {/* <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button onClick={this.changeMember.bind(this, "mother")}>
                     ก่อนหน้า
                  </Button>
                  <h1>คุณพ่อ</h1>
                  {this.props.sibling === "yes" ? (
                     <Button onClick={this.changeMember.bind(this, "brother")}>
                        ถัดไป
                     </Button>
                  ) : (
                     <Button disabled>ถัดไป</Button>
                  )} */}
                  <h1 className="header">
                     แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว
                  </h1>
                  <h2 className="sub-header">
                     คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่
                  </h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>

                  <div className="people">
                     <div className="people__avatar">
                        <img src={dad} alt="father" />
                        <span className="name">คุณพ่อ</span>
                     </div>
                     <ul className="people__nav">
                        <li>
                           <button>1</button>
                        </li>
                        <li className="active">
                           <button>2</button>
                        </li>
                        {this.props.sibling === "yes" ? (
                           <li>
                              <button>3</button>
                           </li>
                        ) : null}
                     </ul>
                     <a
                        href="#"
                        className="people__arrow people__arrow_prev"
                        onClick={this.changeMember.bind(this, "mother")}
                     >
                        <span>ก่อนหน้า</span>
                     </a>
                     {this.props.sibling === "yes" ? (
                        <a
                           href="#"
                           className="people__arrow people__arrow_next"
                           onClick={this.changeMember.bind(this, "brother")}
                        >
                           <span>ถัดไป</span>
                        </a>
                     ) : null}
                  </div>
                  {/* <div className="quiz-block">{this.formGroup("father")}</div> */}

                  <div className="quiz-block">
                     {this.choiceUpdate("หอบหืด", "father_asthma", dadAct01)}
                     {this.choiceUpdate(
                        "แพ้นมวัว",
                        "father_milk_intolerance",
                        dadAct02
                     )}
                     {this.choiceUpdate(
                        "แพ้อากาศ",
                        "father_rhinitis",
                        dadAct03
                     )}
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

                  {/* <Button onClick={this.changeMember.bind(this, "mother")}>
                     กลับ
                  </Button>
                  {this.props.sibling === "yes" ? (
                     <Button onClick={this.changeMember.bind(this, "brother")}>
                        ต่อไป
                     </Button>
                  ) : (
                     <Button onClick={this.changeStep.bind(this, "8")}>
                        ต่อไป
                     </Button>
                  )} */}
                  <div className="form-step">
                     <a
                        className="form-step__nav form-step__nav_prev"
                        href="#"
                        onClick={this.changeMember.bind(this, "mother")}
                     >
                        กลับ
                     </a>
                     <div className="step">
                        <a href="#" className="step__item">
                           <span>1</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>2</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>3</span>
                        </a>
                        <a href="#" className="step__item current">
                           <span>4</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>5</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>6</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>7</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>8</span>
                        </a>
                     </div>
                     {this.props.sibling === "yes" ? (
                        <a
                           className="form-step__nav form-step__nav_next"
                           href="#"
                           onClick={this.changeMember.bind(this, "brother")}
                        >
                           ต่อไป
                        </a>
                     ) : (
                        <a
                           className="form-step__nav form-step__nav_next"
                           href="#"
                           onClick={this.changeStep.bind(this, "8")}
                        >
                           ต่อไป
                        </a>
                     )}
                  </div>
               </React.Fragment>
            );
         case "brother":
            return (
               <React.Fragment>
                  {/* <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ก่อนหน้า
                  </Button>
                  <h1>พี่น้อง</h1>
                  <Button disabled>ถัดไป</Button> */}
                  <h1 className="header">
                     แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว
                  </h1>
                  <h2 className="sub-header">
                     คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่
                  </h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>

                  <div className="people">
                     <div className="people__avatar">
                        <img src={kid} alt="brother" />
                        <span className="name">พี่น้อง</span>
                     </div>
                     <ul className="people__nav">
                        <li>
                           <button>1</button>
                        </li>
                        <li>
                           <button>2</button>
                        </li>
                        <li className="active">
                           <button>3</button>
                        </li>
                     </ul>
                     <a
                        href="#"
                        className="people__arrow people__arrow_prev"
                        onClick={this.changeMember.bind(this, "father")}
                     >
                        <span>ก่อนหน้า</span>
                     </a>
                  </div>

                  {/* <div className="quiz-block">{this.formGroup("brother")}</div> */}

                  <div className="quiz-block">
                     {this.choiceUpdate("หอบหืด", "brother_asthma", kidAct01)}
                     {this.choiceUpdate(
                        "แพ้นมวัว",
                        "brother_milk_intolerance",
                        kidAct02
                     )}
                     {this.choiceUpdate(
                        "แพ้อากาศ",
                        "brother_rhinitis",
                        kidAct03
                     )}
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

                  {/* <Button onClick={this.changeMember.bind(this, "father")}>
                     กลับ
                  </Button>
                  <Button onClick={this.changeStep.bind(this, "8")}>
                     ต่อไป
                  </Button> */}
                  <div className="form-step">
                     <a
                        className="form-step__nav form-step__nav_prev"
                        href="#"
                        onClick={this.changeMember.bind(this, "father")}
                     >
                        กลับ
                     </a>
                     <div className="step">
                        <a href="#" className="step__item">
                           <span>1</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>2</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>3</span>
                        </a>
                        <a href="#" className="step__item current">
                           <span>4</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>5</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>6</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>7</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>8</span>
                        </a>
                     </div>
                     <a
                        className="form-step__nav form-step__nav_next"
                        href="#"
                        onClick={this.changeStep.bind(this, "8")}
                     >
                        ต่อไป
                     </a>
                  </div>
               </React.Fragment>
            );
         default:
            return (
               <React.Fragment>
                  {/* <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button disabled>ก่อนหน้า</Button>
                  <h1>คุณแม่</h1>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ถัดไป
                  </Button>

                  {this.formGroup("mother")}

                  <Button onClick={this.changeStep.bind(this, "6")}>
                     กลับ
                  </Button>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ต่อไป
                  </Button> */}
                  <h1 className="header">
                     แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว
                  </h1>
                  <h2 className="sub-header">
                     คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่
                  </h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>

                  <div className="people">
                     <div className="people__avatar">
                        <img src={mom} alt="mom" />
                        <span className="name">คุณแม่</span>
                     </div>
                     <ul className="people__nav">
                        <li className="active">
                           <button>1</button>
                        </li>
                        <li>
                           <button>2</button>
                        </li>
                        {this.props.sibling === "yes" ? (
                           <li>
                              <button>3</button>
                           </li>
                        ) : null}
                     </ul>
                     <a
                        href="#"
                        className="people__arrow people__arrow_prev"
                        disabled
                     >
                        <span>ก่อนหน้า</span>
                     </a>
                     <a
                        href="#"
                        className="people__arrow people__arrow_next"
                        onClick={this.changeMember.bind(this, "father")}
                     >
                        <span>ถัดไป</span>
                     </a>
                  </div>

                  <div className="quiz-block">
                     {this.choiceUpdate("หอบหืด", "mother_asthma", momAct01)}
                     {this.choiceUpdate(
                        "แพ้นมวัว",
                        "mother_milk_intolerance",
                        momAct02
                     )}
                     {this.choiceUpdate(
                        "แพ้อากาศ",
                        "mother_rhinitis",
                        momAct03
                     )}
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

                  {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}

                  <div className="form-step">
                     <a
                        className="form-step__nav form-step__nav_prev"
                        href="#"
                        onClick={this.changeStep.bind(this, "6")}
                     >
                        กลับ
                     </a>
                     <div className="step">
                        <a href="#" className="step__item">
                           <span>1</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>2</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>3</span>
                        </a>
                        <a href="#" className="step__item current">
                           <span>4</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>5</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>6</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>7</span>
                        </a>
                        <a href="#" className="step__item">
                           <span>8</span>
                        </a>
                     </div>
                     <a
                        className="form-step__nav form-step__nav_next"
                        href="#"
                        onClick={this.changeMember.bind(this, "father")}
                     >
                        ต่อไป
                     </a>
                  </div>
                  {/* <button onClick={this.html2canvas}>
                     <p>+++ PDF +++</p>
                  </button> */}
               </React.Fragment>
            );
      }
   }
}

const mapStateToProps = state => {
   return {
      AllergyPrevention: state.form.AllergyPrevention,
      sibling: state.form.sibling,
      children_id: state.form.Children.id
   };
};

export default connect(
   mapStateToProps,
   { mainQuizAction, changeStepAction }
)(MainQuiz);
