import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfo3Action, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

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
            <h1>คุณแม่คลอดบุตรแล้ว</h1>
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
   { childInfo3Action, changeStepAction }
)(ChildInfo3);
