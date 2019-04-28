import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfoAction, changeStepAction } from "../../actions";

import { TextInput, Button } from "../reuse";

class ChildInfo extends Component {
   state = {
      baby_name: "",
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;

      if (!birthday) birthday = "--";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      this.setState({ baby_name, day, month, year });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { baby_name, day, month, year } = this.state;
      const birthday = `${year}-${month}-${day}`;

      // Todo: Form Validate ****
      this.props.childInfoAction(baby_name, birthday, this.props.memberId);

      this.props.changeStepAction("5.2B");
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>คุณแม่คลอดบุตรแล้ว</h1>
            <h5>รายละเอียดลูกน้อย</h5>
            <TextInput
               name="baby_name"
               value={this.state.baby_name}
               onChange={this.handleChange}
            >
               ชื่อบุตร
            </TextInput>
            <p>วันเกิด</p>
            <TextInput
               name="day"
               value={this.state.day}
               onChange={this.handleChange}
            >
               วันที่
            </TextInput>
            <TextInput
               name="month"
               value={this.state.month}
               onChange={this.handleChange}
            >
               เดือน
            </TextInput>
            <TextInput
               name="year"
               value={this.state.year}
               onChange={this.handleChange}
            >
               ปี
            </TextInput>

            <Button onClick={this.changeStep.bind(this, "4")}>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}
            <h1 class="header">คุณแม่คลอดบุตรแล้ว</h1>
            <h2 class="sub-header">รายละเอียดลูกน้อย</h2>
            <p><span class="input-wrapper"><input class="input input_type_text" type="text" name="baby_name" value="test" /></span></p>
            <h3>วันเกิด</h3>
            
            {/* need to change */}
            <input type="hidden" name="day" value="28" />
            <input type="hidden" name="month" value="1" />
            <input type="hidden" name="year" value="1983" />
            
            <div class="date-spinner date-spinner_birth-day">
               <div class="date-spinner__block">
                  <div class="date-spinner__track date-spinner__track_date">
                     <div class="item-list item-list_date"></div>
                  </div>
                  <span class="spinner-arrow spinner-arrow_up"></span>
                  <span class="spinner-arrow spinner-arrow_down"></span>
                  <span class="spinner-label">วันที่</span>
               </div>
               <div class="date-spinner__block">
                  <div class="date-spinner__track date-spinner__track_month">
                     <div class="item-list item-list_month"></div>
                  </div>
                  <span class="spinner-arrow spinner-arrow_up"></span>
                  <span class="spinner-arrow spinner-arrow_down"></span>
                  <span class="spinner-label">เดือน</span>
               </div>
               <div class="date-spinner__block">
                  <div class="date-spinner__track date-spinner__track_year">
                     <div class="item-list item-list_year"></div>
                  </div>
                  <span class="spinner-arrow spinner-arrow_up"></span>
                  <span class="spinner-arrow spinner-arrow_down"></span>
                  <span class="spinner-label">ปี</span>
               </div>
            </div>
            
            {/* <div class="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div class="form-step">
               <a class="form-step__nav form-step__nav_prev" href="#" onClick={this.changeStep.bind(this, "4")}>กลับ</a>
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
   return { Children: state.form.Children, memberId: state.form.memberId };
};

export default connect(
   mapStateToProps,
   { childInfoAction, changeStepAction }
)(ChildInfo);
