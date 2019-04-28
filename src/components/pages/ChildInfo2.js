import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfo2Action, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

import inTime from "../../img/q03-in-time.svg";
import late from "../../img/q03-late.svg";

//before & exactly
class ChildInfo2 extends Component {
   state = {
      birth_term: ""
   };

   componentDidMount() {
      const { birth_term } = this.props.Children;

      this.setState({ birth_term });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { birth_term } = this.state;

      // Todo: Form Validate ****
      this.props.childInfo2Action(birth_term);

      this.props.changeStepAction("5.2C");
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>คุณแม่คลอดบุตรแล้ว</h1>
            <h5>รายละเอียดการคลอด</h5>
            <Radio
               name="birth_term"
               value="full-term"
               onChange={this.handleChange}
               checked={this.state.birth_term === "full-term"}
            >
               คลอดครบกำหนด
            </Radio>
            <Radio
               name="birth_term"
               value="pre-term"
               onChange={this.handleChange}
               checked={this.state.birth_term === "pre-term"}
            >
               คลอดก่อนกำหนด
            </Radio>
            <Button onClick={this.changeStep.bind(this, "5.2A")}>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}
            <h1 class="header">คุณแม่คลอดบุตรแล้ว</h1>
            <h2 class="sub-header">รายละเอียดการคลอด</h2>
            <ul class="choice choice_horizontal">
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input
                        type="radio"
                        name="birth_term"
                        value="full-term"
                        onChange={this.handleChange}
                        checked={this.state.birth_term === "full-term"}
                     />
                     <div class="choice-item__wrapper">
                        <span class="choice-item__img"><img src={inTime} alt="q03-in-time" /></span>
                        <span class="choice-item__title">คลอดครบกำหนด</span>							
                     </div>
                  </label>
               </li>
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input
                        type="radio"
                        name="birth_term"
                        value="pre-term"
                        onChange={this.handleChange}
                        checked={this.state.birth_term === "pre-term"}
                     />
                     <div class="choice-item__wrapper">
                        <span class="choice-item__img"><img src={late} alt="q03-late" /></span>
                        <span class="choice-item__title">คลอดก่อนกำหนด</span>
                     </div>
                  </label>
               </li>
            </ul>
            
            {/* <div class="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div class="form-step">
               <a class="form-step__nav form-step__nav_prev" href="#" onClick={this.changeStep.bind(this, "5.2A")}>กลับ</a>
               <div class="step">
                  <a href="#" class="step__item"><span>1</span></a>
                  <a href="#" class="step__item current"><span>2</span></a>
                  <a href="#" class="step__item"><span>3</span></a>
                  <a href="#" class="step__item"><span>4</span></a>
                  <a href="#" class="step__item"><span>5</span></a>
                  <a href="#" class="step__item"><span>6</span></a>
                  <a href="#" class="step__item"><span>7</span></a>
                  <a href="#" class="step__item"><span>8</span></a>					
               </div>
               <a class="form-step__nav form-step__nav_next" href="#" onClick={this.handleSubmitForm}>ต่อไป</a>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { Children: state.form.Children };
};

export default connect(
   mapStateToProps,
   { childInfo2Action, changeStepAction }
)(ChildInfo2);
