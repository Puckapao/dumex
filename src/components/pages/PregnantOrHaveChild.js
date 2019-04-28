import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantOrHaveChildAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

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
            <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
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

            <Button onClick={this.handleSubmitForm}>ต่อไป</Button>
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
