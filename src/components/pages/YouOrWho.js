import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction, youOrWhoAction } from "../../actions";

import { Button } from "../reuse";

class YouOrWho extends Component {
   changeStep = (newStep, newMember) => {
      this.props.youOrWhoAction(newMember, this.props.Member);
      this.props.changeStepAction(newStep);
   };

   render() {
      return (
         <React.Fragment>
            <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>สวัสดีคุณ {this.props.Member.firstname || ""}</p>
            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
               Quisquam natus quo iure cumque repellendus nihil minima impedit
               enim explicabo nam. Consequatur quia sit commodi magni eaque
               similique obcaecati dolores excepturi.
            </p>
            <Button onClick={this.changeStep.bind(this, "4", true)}>
               คุณไม่ใช่บุคคลที่กล่าวถึง?
            </Button>
            <Button onClick={this.changeStep.bind(this, "3", false)}>
               เริ่มต้นทำแบบประเมิน
            </Button>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { Member: state.form.Member };
};

export default connect(
   mapStateToProps,
   { changeStepAction, youOrWhoAction }
)(YouOrWho);
