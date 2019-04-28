import React, { Component } from "react";
import { connect } from "react-redux";
import { allergyOrNotAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

class AllergyOrNot extends Component {
   state = {
      allergy: "",
      sibling: ""
   };

   componentDidMount() {
      const { allergy } = this.props.form.Children;
      const { sibling } = this.props.form;

      this.setState({ allergy, sibling });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { allergy, sibling } = this.state;

      // Todo: Form Validate ****
      this.props.allergyOrNotAction(allergy, sibling);

      this.props.changeStepAction("7");
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้</h1>

            {this.props.form.Member.mom_status === "pregnancy" ? (
               <h5>คุณแม่เป็นโรคภูมิแพ้หรือไม่</h5>
            ) : (
               <h5>ลูกคุณเป็นภูมิแพ้หรือไม่</h5>
            )}
            <Radio
               name="allergy"
               value="yes"
               onChange={this.handleChange}
               checked={this.state.allergy === "yes"}
            >
               เป็น
            </Radio>
            <Radio
               name="allergy"
               value="no"
               onChange={this.handleChange}
               checked={this.state.allergy === "no"}
            >
               ไม่เป็น
            </Radio>
            <Radio
               name="allergy"
               value="not-sure"
               onChange={this.handleChange}
               checked={this.state.allergy === "not-sure"}
            >
               ไม่แน่ใจ
            </Radio>

            <h5>ลูกของคุณมีพี่น้องหรือไม่</h5>
            <Radio
               name="sibling"
               value="yes"
               onChange={this.handleChange}
               checked={this.state.sibling === "yes"}
            >
               มี
            </Radio>
            <Radio
               name="sibling"
               value="no"
               onChange={this.handleChange}
               checked={this.state.sibling === "no"}
            >
               ไม่มี
            </Radio>

            <Button>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}
            <h1 class="header">แบบทดสอบความเสี่ยงเป็นภูมิแพ้</h1>
            {this.props.form.Member.mom_status === "pregnancy" ? (
               <h2 class="sub-header">คุณแม่เป็นโรคภูมิแพ้หรือไม่</h2>
            ) : (
               <h2 class="sub-header">ลูกคุณเป็นภูมิแพ้หรือไม่</h2>
            )}
            <ul class="group-choice">
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input type="radio" name="allergy" value="yes" />
                     <span class="choice-item__label">เป็น</span>
                  </label>
               </li>
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input type="radio" name="allergy" value="no" />
                     <span class="choice-item__label">ไม่เป็น</span>
                  </label>
               </li>
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input type="radio" name="allergy" value="not-sure" />
                     <span class="choice-item__label">ไม่แน่ใจ</span>
                  </label>
               </li>
            </ul>
            <h2 class="sub-header">ลูกของคุณมีพี่น้องหรือไม่</h2>
            <ul class="group-choice">
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input type="radio" name="sibling" value="yes" />
                     <span class="choice-item__label">มี</span>
                  </label>
               </li>
               <li class="choice-item">
                  <label class="choice-item__trigger">
                     <input type="radio" name="sibling" value="no" />
                     <span class="choice-item__label">ไม่มี</span>
                  </label>
               </li>
            </ul>

            {/* <div class="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            
            <div class="form-step">
               {/* missing back function */}
               <a class="form-step__nav form-step__nav_prev" href="#">กลับ</a>
               <div class="step">
                  <a href="#" class="step__item"><span>1</span></a>
                  <a href="#" class="step__item"><span>2</span></a>
                  <a href="#" class="step__item current"><span>3</span></a>
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
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { allergyOrNotAction, changeStepAction }
)(AllergyOrNot);
