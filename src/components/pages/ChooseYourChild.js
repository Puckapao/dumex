import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction, chooseYourChildAction } from "../../actions";

import { Button } from "../reuse";

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
         .then(data => this.setState({ children: data }));
   }

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleClick = child => {
      if (this.state.current === "") {
         return this.props.changeStepAction("5.2A");
         // this.changeStep.bind(this, "5.2A");
      }

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
            const lastArr = data[data.length - 1];
            let haveSibling = "no";
            for (var key in lastArr) {
               if (lastArr.hasOwnProperty(key) && key.includes("brother")) {
                  if (lastArr[key] !== 0) {
                     haveSibling = "yes";
                  }
               }
            }
            this.props.chooseYourChildAction(child, haveSibling);
            this.props.changeStepAction("5.2A");
         });
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
                        onChange={() => this.setState({ current: "" })}
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
            <p>
               <button
                  className="button button_solid"
                  onClick={this.handleClick.bind(this, this.state.current)}
               >
                  ยืนยัน
               </button>
            </p>

            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}

            <div className="form-step">
               <div className="step">
                  <a href="#" className="step__item current">
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
                  <a href="#" className="step__item">
                     <span>8</span>
                  </a>
               </div>
               <a
                  className="form-step__nav form-step__nav_next"
                  href="#"
                  onClick={this.changeStep.bind(this, "5.2A")}
               >
                  ต่อไป
               </a>
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
   { changeStepAction, chooseYourChildAction }
)(ChooseYourChild);
