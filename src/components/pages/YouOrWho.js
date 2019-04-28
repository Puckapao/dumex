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
            {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
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
            </Button> */}
            <h1 className="header">ทดสอบความเสี่ยง <strong>ภูมิแพ้</strong> ของลูกน้อย<br />
            รู้เร็ว รู้ง่าย เพียง 1 นาที</h1>
            <h2 className="sub-header">สวัสดีคุณ {this.props.Member.firstname || ""}</h2>
            <div className="page-content you-or-who-content">
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
               <p><a href="#" onClick={this.changeStep.bind(this, "4", true)}>คุณไม่ใช่บุคคลที่กล่าวถึง?</a></p>				
            </div>
            <p><button className="button button_solid" onClick={this.changeStep.bind(this, "3", false)}>เริ่มต้นทำแบบประเมิน</button></p>
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
