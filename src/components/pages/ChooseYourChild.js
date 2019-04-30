import React, { Component } from "react";
import { connect } from "react-redux";
import {
   changeStepAction,
   chooseYourChildAction,
   mainQuizAction
} from "../../actions";

import baby from "../../img/q01-baby.svg";
import babyPlus from "../../img/baby-plus.svg";

class ChooseYourChild extends Component {
   state = {
      children: [],
      current: ""
   };

   componentDidMount() {
      fetch(
         `https://api.careline.dumex.rgb72.net/client/members/${
            this.props.form.memberId
         }/children`,
         {
            method: "GET"
         }
      )
         .then(res => res.json())
         .then(data => {
            this.setState({ children: data });
         });
   }

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   invertScore = AllergyPrevention => {
      let tempAllergy = {};

      for (var key in AllergyPrevention) {
         if (AllergyPrevention.hasOwnProperty(key)) {
            if (key.includes("mother")) {
               if (
                  AllergyPrevention[key] === 3 ||
                  AllergyPrevention[key] === 1
               ) {
                  tempAllergy[`${key}`] = "yes";
               } else if (
                  AllergyPrevention[key] === 2 ||
                  AllergyPrevention[key] === 0.5
               ) {
                  tempAllergy[`${key}`] = "not-sure";
               } else {
                  tempAllergy[`${key}`] = "no";
               }
            } else if (key.includes("father") || key.includes("brother")) {
               if (AllergyPrevention[key] === 2) {
                  tempAllergy[`${key}`] = "yes";
               } else if (AllergyPrevention[key] === 0.5) {
                  tempAllergy[`${key}`] = "not-sure";
               } else if (AllergyPrevention[key] === 1) {
                  if (
                     key.includes("asthma") ||
                     key.includes("milk") ||
                     key.includes("rhinitis") ||
                     key.includes("atopic")
                  ) {
                     tempAllergy[`${key}`] = "not-sure";
                  } else {
                     tempAllergy[`${key}`] = "yes";
                  }
               } else {
                  tempAllergy[`${key}`] = "no";
               }
            }
         }
      }

      return tempAllergy;
   };

   handleClick = child => {
      if (this.state.current === "") {
         this.props.changeStepAction("4");
         // this.changeStep.bind(this, "5.2A");
      } else {
         fetch(
            `https://api.careline.dumex.rgb72.net/client/members/${
               this.props.form.memberId
            }/children/${child.id}/allergy-preventions`,
            {
               method: "GET"
            }
         )
            .then(res => res.json())
            .then(data => {
               console.log(data);
               const lastArr = data[data.length - 1];
               let haveSibling = "no";
               for (var key in lastArr) {
                  if (lastArr.hasOwnProperty(key) && key.includes("brother")) {
                     if (lastArr[key] !== 0) {
                        haveSibling = "yes";
                     }
                  }
               }

               const invert = this.invertScore(lastArr);
               this.props.mainQuizAction(invert, null, false);
               this.props.chooseYourChildAction(child, haveSibling);
               if (child.status === "fetus") {
                  this.props.changeStepAction("5.1A");
               } else {
                  this.props.changeStepAction("5.2A");
               }
            });
      }
   };

   childrenButton = () => {
      return this.state.children.map(child => (
         // <Button key={child.id} onClick={this.handleClick.bind(this, child)}>
         //    {child.baby_name || "null"}
         // </Button>
         <li key={child.id} className="choice-item">
            <label className="choice-item__trigger">
               <input type="radio" name="child" value="child.id" />
               <div
                  // onClick={this.handleClick.bind(this, child)}
                  onClick={() => this.setState({ current: child })}
                  className="choice-item__wrapper"
               >
                  <span className="choice-item__img">
                     <img src={baby} alt="q01-baby" />
                  </span>
                  <span className="choice-item__title">
                     {child.baby_name || "null"}
                  </span>
               </div>
            </label>
         </li>
      ));
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>รายละเอียดการคลอด</p>
            <p>เลือกลูกน้อยที่ต้องการทำแบบทดสอบ</p>

            {this.childrenButton()}
            <Button onClick={this.changeStep.bind(this, "5.2A")}>
               เพิ่มลูก
            </Button>
            <Button>ยืนยัน</Button> */}
            <h1 className="header">
               ทดสอบความเสี่ยง <strong>ภูมิแพ้</strong> ของลูกน้อย
               <br />
               รู้เร็ว รู้ง่าย เพียง 1 นาที
            </h1>
            <h2 className="sub-header">รายละเอียดการคลอด</h2>
            <p>เลือกลูกน้อยที่ต้องการทำแบบทดสอบ</p>
            <ul className="choice choice_horizontal">
               {this.childrenButton()}
               <li className="choice-item">
                  <label className="choice-item__trigger">
                     <input
                        type="radio"
                        name="mom_status"
                        value="add-child"
                        onClick={() => {
                           this.setState(
                              {
                                 current: ""
                              },
                              () => {
                                 this.handleClick(this.state.current);
                              }
                           );
                        }}
                     />
                     <div className="choice-item__wrapper">
                        <span className="choice-item__img">
                           <img src={babyPlus} alt="baby-plus" />
                        </span>
                        <span className="choice-item__title">เพิ่มลูก</span>
                     </div>
                  </label>
               </li>
            </ul>
            {/* need to change */}
            {this.state.current !== "" && (
               <p>
                  <button
                     className="button button_solid"
                     onClick={this.handleClick.bind(this, this.state.current)}
                  >
                     ยืนยัน
                  </button>
               </p>
            )}
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { form: state.form };
};

export default connect(
   mapStateToProps,
   { changeStepAction, chooseYourChildAction, mainQuizAction }
)(ChooseYourChild);
