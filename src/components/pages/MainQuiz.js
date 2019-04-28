import React, { Component } from "react";
import { connect } from "react-redux";
import { mainQuizAction, changeStepAction } from "../../actions";

import { Radio, Button } from "../reuse";

class MainQuiz extends Component {
   state = {
      member: "mother",

      mother_asthma: "",
      mother_milk_intolerance: "",
      mother_rhinitis: "",
      mother_atopic_dermatitis: "",
      mother_urticaria: "",
      mother_drug: "",
      mother_food: "",
      mother_conjunctivitis: "",

      father_asthma: "",
      father_milk_intolerance: "",
      father_rhinitis: "",
      father_atopic_dermatitis: "",
      father_urticaria: "",
      father_drug: "",
      father_food: "",
      father_conjunctivitis: "",

      brother_asthma: "",
      brother_milk_intolerance: "",
      brother_rhinitis: "",
      brother_atopic_dermatitis: "",
      brother_urticaria: "",
      brother_drug: "",
      brother_food: "",
      brother_conjunctivitis: ""
   };

   componentDidMount() {
      const allSyndrome = { ...this.props.AllergyPrevention };

      this.setState(allSyndrome);
   }

   changeMember = updateMember => {
      this.setState({ member: updateMember });
   };

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);

      // Todo: Form Validate ****

      this.props.mainQuizAction(this.state, this.props.children_id);
   };

   choiceGroup = (member, syndrome) => {
      return (
         <React.Fragment>
            <Radio
               name={`${member}_${syndrome}`}
               value="yes"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "yes"}
            >
               O
            </Radio>
            <Radio
               name={`${member}_${syndrome}`}
               value="no"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "no"}
            >
               X
            </Radio>
            <Radio
               name={`${member}_${syndrome}`}
               value="not-sure"
               onChange={this.handleChange}
               checked={this.state[`${member}_${syndrome}`] === "not-sure"}
            >
               ?
            </Radio>
         </React.Fragment>
      );
   };

   formGroup = member => {
      return (
         <React.Fragment>
            {/* asthma */}
            <p>หอบหืด</p>
            {this.choiceGroup(member, "asthma")}

            {/* rhinitis */}
            <p>แพ้อากาศ</p>
            {this.choiceGroup(member, "rhinitis")}

            {/* urticaria */}
            <p>ลมพิษ</p>
            {this.choiceGroup(member, "urticaria")}

            {/* food */}
            <p>แพ้อาหาร</p>
            {this.choiceGroup(member, "food")}

            {/* milk_intolerance */}
            <p>แพ้นมวัว</p>
            {this.choiceGroup(member, "milk_intolerance")}

            {/* atopic_dermatitis */}
            <p>ผื่นแพ้ผิวหนัง</p>
            {this.choiceGroup(member, "atopic_dermatitis")}

            {/* drug */}
            <p>แพ้ยา</p>
            {this.choiceGroup(member, "drug")}

            {/* conjunctivitis */}
            <p>เยื่อบุตาอักเสบจากภูมิแพ้</p>
            {this.choiceGroup(member, "conjunctivitis")}
         </React.Fragment>
      );
   };
   render() {
      switch (this.state.member) {
         case "father":
            return (
               <React.Fragment>
                  <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button onClick={this.changeMember.bind(this, "mother")}>
                     ก่อนหน้า
                  </Button>
                  <h1>คุณพ่อ</h1>
                  {this.props.sibling === "yes" ? (
                     <Button onClick={this.changeMember.bind(this, "brother")}>
                        ถัดไป
                     </Button>
                  ) : (
                     <Button disabled>ถัดไป</Button>
                  )}

                  {this.formGroup("father")}

                  <Button onClick={this.changeMember.bind(this, "mother")}>
                     กลับ
                  </Button>
                  {this.props.sibling === "yes" ? (
                     <Button onClick={this.changeMember.bind(this, "brother")}>
                        ต่อไป
                     </Button>
                  ) : (
                     <Button onClick={this.changeStep.bind(this, "8")}>
                        ต่อไป
                     </Button>
                  )}
               </React.Fragment>
            );
         case "brother":
            return (
               <React.Fragment>
                  <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ก่อนหน้า
                  </Button>
                  <h1>พี่น้อง</h1>
                  <Button disabled>ถัดไป</Button>

                  {this.formGroup("brother")}

                  <Button onClick={this.changeMember.bind(this, "father")}>
                     กลับ
                  </Button>
                  <Button onClick={this.changeStep.bind(this, "8")}>
                     ต่อไป
                  </Button>
               </React.Fragment>
            );
         default:
            return (
               <React.Fragment>
                  <h1>แบบทดสอบความเสี่ยงเป็นภูมิแพ้ของคนในครอบครัว</h1>
                  <h2>คนในครอบครัวเคยมีอาการเหล่านี้หรือไม่</h2>
                  <p>O = เป็น, X = ไม่เป็น, ? = ไม่แน่ใจ</p>
                  <Button disabled>ก่อนหน้า</Button>
                  <h1>คุณแม่</h1>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ถัดไป
                  </Button>

                  {this.formGroup("mother")}

                  <Button onClick={this.changeStep.bind(this, "6")}>
                     กลับ
                  </Button>
                  <Button onClick={this.changeMember.bind(this, "father")}>
                     ต่อไป
                  </Button>
               </React.Fragment>
            );
      }
   }
}

const mapStateToProps = state => {
   return {
      AllergyPrevention: state.form.AllergyPrevention,
      sibling: state.form.sibling,
      children_id: state.form.Children.id
   };
};

export default connect(
   mapStateToProps,
   { mainQuizAction, changeStepAction }
)(MainQuiz);
