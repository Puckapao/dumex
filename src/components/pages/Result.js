import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction, resultAction } from "../../actions";
import { Button } from "../reuse";

class Result extends Component {
   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   componentDidMount() {
      this.props.resultAction(this.props.form);
   }

   renderResult = score => {
      if (score < 2) return <p>ความเสี่ยงต่ำ</p>;
      else return <p>ความเสี่ยงสูง</p>;
   };

   calcScore = AllergyPrevention => {
      let score = [];
      Object.keys(AllergyPrevention).forEach((key, index) => {
         if (index < 4) {
            // main mother
            if (AllergyPrevention[key] === "yes") {
               score.push(3);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(2);
            } else {
               score.push(0);
            }
         } else if (index < 8) {
            // second mother
            if (AllergyPrevention[key] === "yes") {
               score.push(1);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(0.5);
            } else {
               score.push(0);
            }
         } else if (index < 12) {
            // main father
            if (AllergyPrevention[key] === "yes") {
               score.push(2);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(1);
            } else {
               score.push(0);
            }
         } else if (index < 16) {
            // second father
            if (AllergyPrevention[key] === "yes") {
               score.push(1);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(0.5);
            } else {
               score.push(0);
            }
         } else if (index < 20) {
            // main brother
            if (AllergyPrevention[key] === "yes") {
               score.push(2);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(1);
            } else {
               score.push(0);
            }
         } else {
            // second brother
            if (AllergyPrevention[key] === "yes") {
               score.push(1);
            } else if (AllergyPrevention[key] === "not-sure") {
               score.push(0.5);
            } else {
               score.push(0);
            }
         }
      });

      const maxScore = {
         mother: {
            main: 0,
            second: 0
         },
         father: {
            main: 0,
            second: 0
         },
         brother: {
            main: 0,
            second: 0
         }
      };

      maxScore.mother.main = Math.max.apply(null, score.slice(0, 4));
      maxScore.mother.second = Math.max.apply(null, score.slice(4, 8));
      maxScore.father.main = Math.max.apply(null, score.slice(8, 12));
      maxScore.father.second = Math.max.apply(null, score.slice(12, 16));
      maxScore.brother.main = Math.max.apply(null, score.slice(16, 20));
      maxScore.brother.second = Math.max.apply(null, score.slice(20, 24));

      return (
         maxScore.mother.main +
         maxScore.mother.second +
         maxScore.father.main +
         maxScore.father.second +
         maxScore.brother.main +
         maxScore.brother.second
      );
   };

   render() {
      return (
         <React.Fragment>
            <h1>ผลทดสอบความเสี่ยงภูมิแพ้</h1>
            <Button onClick={this.changeStep.bind(this, "9")}>
               ขอคำปรึกษาจากผู้เชี่ยวชาญ
            </Button>
            <Button>บันทึกผลเพื่อปรึกษาแพทย์</Button>
            {this.renderResult(
               this.calcScore(this.props.form.AllergyPrevention)
            )}
            <Button>กลับ</Button>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { changeStepAction, resultAction }
)(Result);
