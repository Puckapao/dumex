import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction, chooseYourChildAction } from "../../actions";

import { Button } from "../reuse";

class ChooseYourChild extends Component {
   state = {
      children: []
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
         <Button key={child.id} onClick={this.handleClick.bind(this, child)}>
            {child.baby_name || "null"}
         </Button>
      ));
   };

   render() {
      return (
         <React.Fragment>
            <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>รายละเอียดการคลอด</p>
            <p>เลือกลูกน้อยที่ต้องการทำแบบทดสอบ</p>

            {this.childrenButton()}
            <Button onClick={this.changeStep.bind(this, "5.2A")}>
               เพิ่มลูก
            </Button>
            <Button>ยืนยัน</Button>
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
