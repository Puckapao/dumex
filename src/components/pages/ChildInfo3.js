import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfo3Action, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

import tool from "../../img/q04-tools.svg";
import normal from "../../img/q04-born.svg";

// surgery & natural
class ChildInfo3 extends Component {
   state = {
      labor: ""
   };

   componentDidMount() {
      const { labor } = this.props.Children;

      this.setState({ labor });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { labor } = this.state;

      // Todo: Form Validate ****
      this.props.childInfo3Action(labor);

      this.props.changeStepAction("6");
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>คุณแม่คลอดบุตรแล้ว</h1>
            <h5>รายละเอียดการคลอด</h5>
            <Radio
               name="labor"
               value="c-section"
               onChange={this.handleChange}
               checked={this.state.labor === "c-section"}
            >
               ผ่าคลอด
            </Radio>
            <Radio
               name="labor"
               value="normal"
               onChange={this.handleChange}
               checked={this.state.labor === "normal"}
            >
               คลอดธรรมชาติ
            </Radio>
            <Button onClick={this.changeStep.bind(this, "5.2B")}>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}
            <h1 className="header">คุณแม่คลอดบุตรแล้ว</h1>
            <h2 className="sub-header">รายละเอียดการคลอด</h2>
            <ul className="choice choice_horizontal">
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     <input
                        type="radio"
                        name="labor"
                        value="c-section"
                        onChange={this.handleChange}
                        checked={this.state.labor === "c-section"}
                     />
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img">
                           <img src={tool} alt="q04-tools" />
                        </span>
                        <span className="choice-item__title">ผ่าคลอด</span>
                     </div>
                  </label>
               </li>
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     <input
                        type="radio"
                        name="labor"
                        value="normal"
                        onChange={this.handleChange}
                        checked={this.state.labor === "normal"}
                     />
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img">
                           <img src={normal} alt="q04-born" />
                        </span>
                        <span className="choice-item__title">คลอดธรรมชาติ</span>
                     </div>
                  </label>
               </li>
            </ul>

            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div className="form-step">
               <a
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "5.2B")}
               >
                  กลับ
               </a>
               <div className="step">
                  <a href="#" className="step__item">
                     <span>1</span>
                  </a>
                  <a href="#" className="step__item current">
                     <span>2</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>3</span>
                  </a>
                  <a href="#" className="step__item">
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
                  onClick={this.handleSubmitForm}
               >
                  ต่อไป
               </a>
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
   { childInfo3Action, changeStepAction }
)(ChildInfo3);
