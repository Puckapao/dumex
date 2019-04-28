import React, { Component } from "react";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";

import { changeStepAction, callBackLaterAction } from "../../actions";

import { TextInput, Checkbox, Button } from "../reuse";

class CallBackLater extends Component {
   state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      is_sms: false,
      is_call: false,
      error: {}
   };

   componentDidMount() {
      const {
         firstname,
         lastname,
         phone,
         email,
         is_sms,
         is_call
      } = this.props.form.Member;

      this.setState({ firstname, lastname, phone, email, is_sms, is_call });
   }

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleChange = e => {
      if (e.target.type === "checkbox") {
         return this.setState({ [e.target.name]: e.target.checked });
      }

      this.setState({ [e.target.name]: e.target.value });
   };

   handleSubmitForm = e => {
      e.preventDefault();

      // form validation

      let error = {};

      if (isEmpty(this.state.firstname)) {
         error.firstname = "First name is not empty";
      }
      if (isEmpty(this.state.lastname)) {
         error.lastname = "Last name is not empty";
      }
      if (!isLength(this.state.phone, { min: 8, max: 10 })) {
         error.phone = "Phone length must be 9-10 digits";
      }
      if (!isEmail(this.state.email)) {
         error.email = "Invalid email";
      }

      // send to redux

      if (Object.keys(error).length === 0) {
         this.props.callBackLaterAction(this.state, this.props.form.Member);
      } else {
         this.setState({ error });
      }
   };

   render() {
      return (
         <React.Fragment>
            <h1 className="header">กรุณากรอกข้อมูลเพื่อได้รับการติดต่อกลับโดยไม่มีค่าใช้จ่าย</h1>
            <TextInput
               name="firstname"
               value={this.state.firstname}
               onChange={this.handleChange}
            >
               ชื่อจริง
            </TextInput>
            {this.state.error.firstname || null}

            <TextInput
               name="lastname"
               value={this.state.lastname}
               onChange={this.handleChange}
            >
               นามสกุล
            </TextInput>
            {this.state.error.lastname || null}

            <TextInput
               name="phone"
               value={this.state.phone}
               onChange={this.handleChange}
            >
               เบอร์โทรศัพท์
            </TextInput>
            {this.state.error.phone || null}

            <Checkbox
               name="is_sms"
               value={this.state.is_sms}
               onChange={this.handleChange}
               checked={this.state.is_sms}
            >
               ยินดีรับ SMS ข้อมูลที่เป็นประโยชน์
            </Checkbox>
            <TextInput
               name="email"
               value={this.state.email}
               onChange={this.handleChange}
            >
               อีเมลล์
            </TextInput>
            {this.state.error.email || null}

            <Checkbox
               name="is_call"
               value={this.state.is_call}
               onChange={this.handleChange}
               checked={this.state.is_call}
            >
               ให้เจ้าหน้าที่ติดต่อกลับทางโทรศัพท์
            </Checkbox>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
               hic exercitationem, ipsam est officiis minima voluptate dolores,
               fugiat facere consequuntur a? Quisquam sapiente voluptatem
               asperiores consequuntur nostrum reprehenderit tempora cum?
            </p>

            <Button onClick={this.handleSubmitForm}>บันทึกข้อมูล</Button>
            <Button onClick={this.changeStep.bind(this, "8")}>กลับ</Button>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { changeStepAction, callBackLaterAction }
)(CallBackLater);
