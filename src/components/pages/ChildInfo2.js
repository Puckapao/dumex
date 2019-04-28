import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfo2Action, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

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
            <h1>คุณแม่คลอดบุตรแล้ว</h1>
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
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button>
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
