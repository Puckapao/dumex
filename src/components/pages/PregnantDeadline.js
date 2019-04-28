import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantDeadlineAction, changeStepAction } from "../../actions";

import { TextInput, Button } from "../reuse";

class PregnantDeadline extends Component {
   state = {
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      let { due_date } = this.props.Member;
      if (!due_date) due_date = "--";

      const day = due_date.split("-")[2];
      const month = due_date.split("-")[1];
      const year = due_date.split("-")[0];

      this.setState({ day, month, year });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { day, month, year } = this.state;
      const due_date = `${year}-${month}-${day}`;

      // Todo: Form Validate ****
      this.props.pregnantDeadlineAction(due_date, this.props.memberId);

      this.props.changeStepAction("6");
   };

   render() {
      return (
         <React.Fragment>
            <h1>คุณแม่กำลังตั้งครรภ์</h1>
            <h5>กำหนดคลอด</h5>

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
   return { Member: state.form.Member, memberId: state.form.memberId };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
