import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction, resultAction } from "../../actions";
import { Button } from "../reuse";

import lowRisk from "../../img/endcard-low.svg";
import highRisk from "../../img/endcard-high.svg";

class Result extends Component {
   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   componentDidMount() {
      this.props.resultAction(this.props.form);
   }

   renderResult = score => {
      if (score < 2)
         return (
            <React.Fragment>
               <div className="result-box">
                  <img src={lowRisk} alt="low-risk" width="360" height="480" />
                  <h2 className="result-box__header">
                     ลูกของคุณมี <strong>ความเสี่ยงต่ำ</strong> ที่จะเกิดภูมิแพ้
                  </h2>
               </div>
               <a href="#" className="result-share-button">
                  <span>Share</span>
               </a>
               <div className="result-info">
                  <p>
                     ขอแสดงความยินดีกับคุณแม่ที่ลูกน้อยของคุณแม่มีความเสี่ยงในการเกิดโรค{" "}
                     <strong>ภูมิแพ้</strong> ตํ่า อย่างไรก็ตามภูมิต้านทาน
                     คือรากฐาน สําคัญสําหรับสุขภาพในระยะยาว
                     ควรส่งเสริมภูมิต้านทานให้ลูกน้อยด้วยการให้นมแม่อย่างน้อย 6
                     เดือน
                  </p>
               </div>
            </React.Fragment>
         );
      else
         return (
            <React.Fragment>
               <img src={highRisk} alt="high-risk" width="360" height="480" />
               <h2 className="result-box__header">
                  ลูกของคุณมี <strong>ความเสี่ยงสูง</strong> ที่จะเกิดภูมิแพ้
               </h2>
               <div className="result-info">
                  <p>
                     โรค <strong>ภูมิแพ้</strong>{" "}
                     สามารถถ่ายทอดผ่านทางพันธุกรรมได้
                     ซึ่งน้องมีความเสี่ยงสูงที่อาจจะเกิดโรค{" "}
                     <strong>ภูมิแพ้</strong> ในอนาคต
                     คุณแม่ควรเลี้ยงลูกด้วยนมแม่ให้นานที่สุด หรืออย่างน้อย 6
                     เดือน เพราะนมแม่คือโภชนาการที่ดีที่สุดสําหรับทารก
                     และยังเป็นนมที่เหมาะสมในการป้องกัน โรค{" "}
                     <strong>ภูมิแพ้</strong>{" "}
                     เนื่องจากนมแม่มีโปรตีนที่ไม่ไปกระตุ้นการเกิด
                     ภูมิแพ้และยังมีองค์ประกอบที่ช่วยส่งเสริมภูมิต้านทานหลายชนิด
                     เช่น ซินไบโอติก ในกรณีที่คุณแม่ไม่สามารถให้นมบุตรได้
                     ควรปรึกษาบุคลากรทางการแพทย์ในการให้นมสูตร pHF หรือ H.A.
                     ที่มีโปรตีนขนาดเล็ก
                     ซึ่งมีโครงสร้างที่ช่วยลดการกระตุ้นการเกิด{" "}
                     <strong>ภูมิแพ้</strong> เหมือนในนมแม่
                  </p>
                  <h4>
                     "เปลี่ยนภูมิแพ้... เป็นภูมิพร้อม" ตั้งแต่วันนี้
                     เพราะอนาคตเป็นของคนที่พร้อม
                  </h4>
                  <p>
                     ให้ลูกน้อยมีภูมิต้านทานที่แข็งแรง ไม่เสี่ยงต่อ{" "}
                     <strong>ภูมิแพ้</strong>{" "}
                     เรียนรู้โลกอย่างกว้างอย่างไร้อุปสรรค
                     เพราะอนาคตเป็นของคนที่พร้อม
                     สอบถามเรื่องนมเพื่อลดความเสี่ยงอาการภูมิแพ้ได้ที่{" "}
                     <strong>02-740-3456</strong>
                  </p>
               </div>
            </React.Fragment>
         );
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
            {/* <h1>ผลทดสอบความเสี่ยงภูมิแพ้</h1>
            <Button onClick={this.changeStep.bind(this, "9")}>
               ขอคำปรึกษาจากผู้เชี่ยวชาญ
            </Button>
            <Button>บันทึกผลเพื่อปรึกษาแพทย์</Button>
            {this.renderResult(
               this.calcScore(this.props.form.AllergyPrevention)
            )}
            <Button>กลับ</Button> */}
            <h1 className="header">
               ผลทดสอบความเสี่ยง <strong>ภูมิแพ้</strong>
            </h1>
            <div className="result-wrapper">
               {this.renderResult(
                  this.calcScore(this.props.form.AllergyPrevention)
               )}
               <div className="result-action">
                  <a
                     href="#"
                     className="result-action__button result-action__button_call"
                     onClick={this.changeStep.bind(this, "9")}
                  >
                     ยินดีให้ผู้เชี่ยวชาญติดต่อกลับ
                  </a>
                  <a
                     href="#"
                     className="result-action__button result-action__button_save"
                     onClick={this.changeStep.bind(this, "11")}
                  >
                     บันทึกผลเพื่อปรึกษาแพทย์
                  </a>
               </div>
            </div>
            <div className="form-step">
               {/* need to change */}
               {/* <a
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "1")}
               >
                  กลับ
               </a> */}
               <div className="step">
                  <a href="#" className="step__item">
                     <span>1</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>2</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>3</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>4</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>5</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>6</span>
                  </a>
                  <a href="#" className="step__item">
                     <span>7</span>
                  </a>
                  <a href="#" className="step__item current">
                     <span>8</span>
                  </a>
               </div>
            </div>
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
