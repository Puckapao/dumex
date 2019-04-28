import React, { Component } from "react";
import { connect } from "react-redux";
import { mainQuizAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";
import mom from "../../img/mom.svg";

import momAct01 from "../../video/mom_act_01_movecrop.mp4";
import momAct02 from "../../video/mom_act_02_movecrop.mp4";
import momAct03 from "../../video/mom_act_03_movecrop.mp4";
import momAct04 from "../../video/mom_act_04_movecrop.mp4";
import momAct05 from "../../video/mom_act_05_movecrop.mp4";
import momAct06 from "../../video/mom_act_06_movecrop.mp4";
import momAct07 from "../../video/mom_act_07_movecrop.mp4";
import momAct08 from "../../video/mom_act_08_movecrop.mp4";

class MainQuiz extends Component {
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
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);

      // Todo: Form Validate ****

      this.props.mainQuizAction(this.state, this.props.children_id);
   };

   choiceGroup = (member, syndrome) => {
      return (
         <React.Fragment>
            <Radio
               name={`${member}_${syndrome}`}
               value="yes"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "yes"}
            >
               O
            </Radio>
            <Radio
               name={`${member}_${syndrome}`}
               value="no"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "no"}
            >
               X
            </Radio>
            <Radio
               name={`${member}_${syndrome}`}
               value="not-sure"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "not-sure"}
            >
               ?
            </Radio>
         </React.Fragment>
      );
   };

   formGroup = member => {
      return (
         <React.Fragment>
            {/* asthma */}
            <p>หอบหืด</p>
            {this.choiceGroup(member, "asthma")}

            {/* rhinitis */}
            <p>แพ้อากาศ</p>
            {this.choiceGroup(member, "rhinitis")}

            {/* urticaria */}
            <p>ลมพิษ</p>
            {this.choiceGroup(member, "urticaria")}

            {/* food */}
            <p>แพ้อาหาร</p>
            {this.choiceGroup(member, "food")}

            {/* milk_intolerance */}
            <p>แพ้นมวัว</p>
            {this.choiceGroup(member, "milk_intolerance")}

            {/* atopic_dermatitis */}
            <p>ผื่นแพ้ผิวหนัง</p>
            {this.choiceGroup(member, "atopic_dermatitis")}

            {/* drug */}
            <p>แพ้ยา</p>
            {this.choiceGroup(member, "drug")}

            {/* conjunctivitis */}
            <p>เยื่อบุตาอักเสบจากภูมิแพ้</p>
            {this.choiceGroup(member, "conjunctivitis")}
         </React.Fragment>
      );
   };
   render() {
      switch (this.state.member) {
         case "father":
            return (
               <React.Fragment>
                  <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
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
                  )}

                  {this.formGroup("father")}

                  <Button onClick={this.changeMember.bind(this, "mother")}>
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
                  )}
               </React.Fragment>
            );
         case "brother":
            return (
               <React.Fragment>
                  <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ก่อนหน้า
                  </Button>
                  <h1>พี่น้อง</h1>
                  <Button disabled>ถัดไป</Button>

                  {this.formGroup("brother")}

                  <Button onClick={this.changeMember.bind(this, "father")}>
                     กลับ
                  </Button>
                  <Button onClick={this.changeStep.bind(this, "8")}>
                     ต่อไป
                  </Button>
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
                        <li>
                           <button>3</button>
                        </li>
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
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">หอบหืด</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct01}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_asthma"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_asthma"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_asthma"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">แพ้นมวัว</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct02}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_milk_intolerance"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_milk_intolerance"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_milk_intolerance"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">แพ้อากาศ</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct03}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_rhinitis"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_rhinitis"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_rhinitis"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">ผื่นแพ้ผิวหนัง</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct04}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_atopic_dermatitis"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_atopic_dermatitis"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_atopic_dermatitis"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">ลมพิษ</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct05}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_urticaria"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_urticaria"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_urticaria"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">แพ้ยา</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct06}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_drug"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_drug"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_drug"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">แพ้อาหาร</h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct07}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_food"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_food"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_food"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="quiz-block__item">
                        <h4 className="quiz-block__title">
                           เยื่อบุตาอักเสบจากภูมิแพ้
                        </h4>
                        <div className="quiz-wrapper">
                           <div className="quiz-wrapper__video">
                              <video
                                 src={momAct08}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                              />
                           </div>
                           <ul className="quiz">
                              <li className="quiz__item" title="เป็น">
                                 <label className="quiz__trigger">
                                    <input
                                       type="radio"
                                       name="mother_conjunctivitis"
                                       value="yes"
                                    />
                                    <span className="quiz__icon quiz__icon_yes" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่เป็น"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_conjunctivitis"
                                       value="no"
                                    />
                                    <span className="quiz__icon quiz__icon_no" />
                                 </label>
                              </li>
                              <li className="quiz__item">
                                 <label
                                    className="quiz__trigger"
                                    title="ไม่แน่ใจ"
                                 >
                                    <input
                                       type="radio"
                                       name="mother_conjunctivitis"
                                       value="not-sure"
                                    />
                                    <span className="quiz__icon quiz__icon_not-sure" />
                                 </label>
                              </li>
                           </ul>
                        </div>
                     </div>
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
