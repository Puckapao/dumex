import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfo2Action, changeStepAction } from "../../actions";

import inTime from "../../img/q03-in-time.svg";
import late from "../../img/q03-late.svg";

//before & exactly
class ChildInfo2 extends Component {
   state = {
      birth_term: ""
   };

   componentDidMount() {
      const { birth_term } = this.props.Children;

      this.setState({ birth_term }, () => {
         if (this.state.birth_term === "" || this.state.birth_term === null)
            this.setState({ birth_term: "0" });
      });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = (e, term) => {
      e.preventDefault();

      this.setState(
         {
            [e.target.name]: term
         },
         () => {
            const { birth_term } = this.state;

            // Todo: Form Validate ****
            this.props.childInfo2Action(birth_term);

            this.props.changeStepAction("5.2C");
         }
      );
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
            <h1 className="header">คุณแม่คลอดบุตรแล้ว</h1>
            <h2 className="sub-header">รายละเอียดการคลอด</h2>
            <ul className="choice choice_horizontal">
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     {this.state.birth_term === "0" ? (
                        <input
                           type="radio"
                           name="birth_term"
                           value="full-term"
                           defaultChecked={
                              this.state.birth_term === "full-term"
                           }
                           onClick={e => {
                              this.handleSubmitForm(e, "full-term");
                           }}
                        />
                     ) : (
                        <input
                           type="radio"
                           name="birth_term"
                           value="full-term"
                           onChange={this.handleChange}
                           checked={this.state.birth_term === "full-term"}
                        />
                     )}
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img">
                           <img src={inTime} alt="q03-in-time" />
                        </span>
                        <span className="choice-item__title">คลอดครบกำหนด</span>
                     </div>
                  </label>
               </li>
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     {this.state.birth_term === "0" ? (
                        <input
                           type="radio"
                           name="birth_term"
                           value="pre-term"
                           defaultChecked={this.state.birth_term === "pre-term"}
                           onClick={e => {
                              this.handleSubmitForm(e, "pre-term");
                           }}
                        />
                     ) : (
                        <input
                           type="radio"
                           name="birth_term"
                           value="pre-term"
                           onChange={this.handleChange}
                           checked={this.state.birth_term === "pre-term"}
                        />
                     )}
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img">
                           <img src={late} alt="q03-late" />
                        </span>
                        <span className="choice-item__title">
                           คลอดก่อนกำหนด
                        </span>
                     </div>
                  </label>
               </li>
            </ul>

            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div className="form-step">
               {/* <a
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "5.2A")}
               >
                  กลับ
               </a> */}
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
               {this.props.Children.birth_term !== "" &&
                  this.props.Children.birth_term !== null && (
                     <a
                        className="form-step__nav form-step__nav_next"
                        href="#"
                        onClick={this.handleSubmitForm}
                     >
                        ต่อไป
                     </a>
                  )}
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
