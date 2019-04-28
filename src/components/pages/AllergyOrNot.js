import React, { Component } from "react";
import { connect } from "react-redux";
import { allergyOrNotAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

class AllergyOrNot extends Component {
   state = {
      allergy: "",
      sibling: ""
   };

   componentDidMount() {
      const { allergy } = this.props.form.Children;
      const { sibling } = this.props.form;

      this.setState({ allergy, sibling });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { allergy, sibling } = this.state;

      // Todo: Form Validate ****
      this.props.allergyOrNotAction(allergy, sibling);

      this.props.changeStepAction("7");
   };

   render() {
      return (
         <React.Fragment>
            <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้</h1>

            {this.props.form.Member.mom_status === "pregnancy" ? (
               <h5>คุณแม่เป็นโรคภูมิแพ้หรือไม่</h5>
            ) : (
               <h5>ลูกคุณเป็นภูมิแพ้หรือไม่</h5>
            )}
            <Radio
               name="allergy"
               value="yes"
               onChange={this.handleChange}
               checked={this.state.allergy === "yes"}
            >
               เป็น
            </Radio>
            <Radio
               name="allergy"
               value="no"
               onChange={this.handleChange}
               checked={this.state.allergy === "no"}
            >
               ไม่เป็น
            </Radio>
            <Radio
               name="allergy"
               value="not-sure"
               onChange={this.handleChange}
               checked={this.state.allergy === "not-sure"}
            >
               ไม่แน่ใจ
            </Radio>

            <h5>ลูกของคุณมีพี่น้องหรือไม่</h5>
            <Radio
               name="sibling"
               value="yes"
               onChange={this.handleChange}
               checked={this.state.sibling === "yes"}
            >
               มี
            </Radio>
            <Radio
               name="sibling"
               value="no"
               onChange={this.handleChange}
               checked={this.state.sibling === "no"}
            >
               ไม่มี
            </Radio>

            <Button>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { allergyOrNotAction, changeStepAction }
)(AllergyOrNot);
