import React, { Component } from "react";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";

import { inputMumNameAction } from "../../actions";

import { TextInput, Button } from "../reuse";

class InputMumName extends Component {
   state = {
      firstname: "nutricia88",
      lastname: "expert88",
      phone: "0812345688",
      email: "nutricia88@nutriciaexpert.com",
      error: {}
   };

   handleChange = e => {
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
         this.props.inputMumNameAction(this.state);
      } else {
         this.setState({ error });
      }
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>กรุณากรอกข้อมูลของท่าน</p>
            <TextInput
               name="firstname"
               value={this.state.firstname}
               onChange={this.handleChange}
            >
               ชื่อ
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
               เบอร์โทร
            </TextInput>
            {this.state.error.phone || null}

            <TextInput
               name="email"
               value={this.state.email}
               onChange={this.handleChange}
            >
               อีเมลล์
            </TextInput>
            {this.state.error.email || null}

            <Button onClick={this.handleSubmitForm}>
               เริ่มต้นทำแบบประเมิน
            </Button> */}
            <h1 className="header responsive">
               <span>ทดสอบความเสี่ยง</span> <strong>ภูมิแพ้</strong> <span>ของลูกน้อย</span>
               <br />
               <span>รู้เร็ว รู้ง่าย เพียง 1 นาที</span>
            </h1>
            <h2 className="sub-header">กรุณากรอกข้อมูลของคุณ</h2>
            <p>
               <span className="input-wrapper req">
                  <input
                     className="input input_type_text"
                     required
                     type="text"
                     name="firstname"
                     value={this.state.firstname}
                     onChange={this.handleChange}
                     placeholder="ชื่อ"
                  />
               </span>
               {this.state.error.firstname || null}
            </p>
            <p>
               <span className="input-wrapper req">
                  <input
                     className="input input_type_text"
                     required
                     type="text"
                     name="lastname"
                     value={this.state.lastname}
                     onChange={this.handleChange}
                     placeholder="นามสกุล"
                  />
               </span>
               {this.state.error.lastname || null}
            </p>
            <p>
               <span className="input-wrapper req">
                  <input
                     className="input input_type_text"
                     required
                     type="text"
                     name="phone"
                     value={this.state.phone}
                     onChange={this.handleChange}
                     placeholder="เบอร์โทร"
                  />
               </span>
               {this.state.error.phone || null}
            </p>
            <p>
               <span className="input-wrapper req">
                  <input
                     className="input input_type_text"
                     required
                     type="text"
                     name="email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     placeholder="อีเมล์"
                  />
               </span>
               {this.state.error.email || null}
            </p>
            <p>
               <button
                  className="button button_solid"
                  onClick={this.handleSubmitForm}
               >
                  เริ่มต้นทำแบบประเมิน
               </button>
            </p>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { inputMumNameAction }
)(InputMumName);
