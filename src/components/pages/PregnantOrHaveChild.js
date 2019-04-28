import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantOrHaveChildAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

import pregnant from "../../img/q02-pregnant.svg";
import birth from "../../img/q02-birth.svg";

class PregnantOrHaveChild extends Component {
   state = {
      mom_status: ""
   };

   componentDidMount() {
      const { mom_status } = this.props.Member;

      this.setState({ mom_status });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleSubmitForm = e => {
      e.preventDefault();

      if (this.state.mom_status === "pregnancy") {
         this.props.changeStepAction("5.1A");
         this.props.pregnantOrHaveChildAction("pregnancy", "fetus");
      } else if (this.state.mom_status === "mom-child") {
         this.props.changeStepAction("5.2A");
         this.props.pregnantOrHaveChildAction("mom-child", "born");
      }
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>กรุณาเลือกสถานะ</p>

            <Radio
               name="mom_status"
               value="pregnancy"
               onChange={this.handleChange}
               checked={this.state.mom_status === "pregnancy"}
            >
               กำลังตั้งครรภ์
            </Radio>
            <Radio
               name="mom_status"
               value="mom-child"
               onChange={this.handleChange}
               checked={this.state.mom_status === "mom-child"}
            >
               คลอดบุตรแล้ว
            </Radio>

            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}

            <h1 class="header">ทดสอบความเสี่ยง <strong>ภูมิแพ้</strong> ของลูกน้อย<br />
            รู้เร็ว รู้ง่าย เพียง 1 นาที</h1>
            <h2 className="sub-header">กรุณาเลือกสถานะ</h2>
            <ul className="choice choice_horizontal">
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     <input type="radio" name="mom_status" value="pregnancy" />
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img"><img src={pregnant} alt="q02-pregnant" /></span>
                        <span className="choice-item__title">กำลังตั้งครรภ์</span>							
                     </div>
                  </label>
               </li>
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     <input type="radio" name="mom_status" value="mom-child" />
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img"><img src={birth} alt="q02-birth" /></span>
                        <span className="choice-item__title">คลอดบุตรแล้ว</span>
                     </div>
                  </label>
               </li>
            </ul>
            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div className="form-step">
               <div className="step">
                  <a href="#" className="step__item current"><span>1</span></a>
                  <a href="#" className="step__item"><span>2</span></a>
                  <a href="#" className="step__item"><span>3</span></a>
                  <a href="#" className="step__item"><span>4</span></a>
                  <a href="#" className="step__item"><span>5</span></a>
                  <a href="#" className="step__item"><span>6</span></a>
                  <a href="#" className="step__item"><span>7</span></a>
                  <a href="#" className="step__item"><span>8</span></a>					
               </div>
               <a className="form-step__nav form-step__nav_next" href="#" onClick={this.handleSubmitForm}>ต่อไป</a>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { Member: state.form.Member };
};

export default connect(
   mapStateToProps,
   { pregnantOrHaveChildAction, changeStepAction }
)(PregnantOrHaveChild);
