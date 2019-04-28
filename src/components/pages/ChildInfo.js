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
            <h1>คุณแม่คลอดบุตรแล้ว</h1>
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
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button>
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
