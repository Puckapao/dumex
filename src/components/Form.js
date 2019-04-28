import React, { Component } from "react";
import { connect } from "react-redux";
import { formAction } from "../actions";

import { Radio } from "./reuse";

class Form extends Component {
   state = {
      quiz1: "",
      quiz2: "",
      quiz3: "",
      quiz4: "",
      quiz5: "",
      quiz6: "",
      quiz7: "",
      quiz8: ""
   };

   componentWillUnmount() {
      // const {
      //    quiz1,
      //    quiz2,
      //    quiz3,
      //    quiz4,
      //    quiz5,
      //    quiz6,
      //    quiz7,
      //    quiz8
      // } = this.props.form.form[`${this.props.member}`];
      // this.setState({ quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8 });
      console.log(this.props.member);
   }

   componentDidUpdate() {
      // const {
      //    quiz1,
      //    quiz2,
      //    quiz3,
      //    quiz4,
      //    quiz5,
      //    quiz6,
      //    quiz7,
      //    quiz8
      // } = this.state;
      // const { member } = this.props;
      // this.props.formAction({
      //    quiz1,
      //    quiz2,
      //    quiz3,
      //    quiz4,
      //    quiz5,
      //    quiz6,
      //    quiz7,
      //    quiz8,
      //    member
      // });
   }

   componentWillReceiveProps() {
      const {
         quiz1,
         quiz2,
         quiz3,
         quiz4,
         quiz5,
         quiz6,
         quiz7,
         quiz8
      } = this.state;

      const { member } = this.props;
      this.props.formAction({
         quiz1,
         quiz2,
         quiz3,
         quiz4,
         quiz5,
         quiz6,
         quiz7,
         quiz8,
         member
      });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   choiceGroup = name => {
      return (
         <React.Fragment>
            <Radio
               name={name}
               value="yes"
               onChange={this.handleChange}
               checked={this.state[`${name}`] === "yes"}
            >
               O
            </Radio>
            <Radio
               name={name}
               value="no"
               onChange={this.handleChange}
               checked={this.state[`${name}`] === "no"}
            >
               X
            </Radio>
            <Radio
               name={name}
               value="maybe"
               onChange={this.handleChange}
               checked={this.state[`${name}`] === "maybe"}
            >
               ?
            </Radio>
         </React.Fragment>
      );
   };

   render() {
      return (
         <React.Fragment>
            <p>หอบหืด</p>
            {this.choiceGroup("quiz1")}

            <p>แพ้อากาศ</p>
            {this.choiceGroup("quiz2")}

            <p>ลมพิษ</p>
            {this.choiceGroup("quiz3")}

            <p>แพ้อาหาร</p>
            {this.choiceGroup("quiz4")}

            <p>แพ้นมวัว</p>
            {this.choiceGroup("quiz5")}

            <p>ผื่นแพ้ผิวหนัง</p>
            {this.choiceGroup("quiz6")}

            <p>แพ้ยา</p>
            {this.choiceGroup("quiz7")}

            <p>เยื่อบุตาอักเสบจากภูมิแพ้</p>
            {this.choiceGroup("quiz8")}
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { formAction }
)(Form);
