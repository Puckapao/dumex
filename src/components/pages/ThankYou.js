import React, { Component } from "react";
import { connect } from "react-redux";
import { changeStepAction } from "../../actions";

class ThankYou extends Component {
   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   render() {
      return (
         <React.Fragment>
            <h1 className="header">
               ทดสอบความเสี่ยง <strong>ภูมิแพ้</strong> ของลูกน้อย
               <br />
               รู้เร็ว รู้ง่าย เพียง 1 นาที
            </h1>
            <h2 className="sub-header">
               ขอบคุณ คุณ {this.props.Member.firstname || ""}
            </h2>
            <div className="page-content you-or-who-content">
               <p>ทางเราจะติดต่อกลับไปยังท่านโดยเร็วที่สุด</p>
            </div>
            <p>
               <a
                  className="button button_solid"
                  href="https://nutriciaexpert.com/"
               >
                  กลับสู่หน้าแรก
               </a>
            </p>
            <div style={{ height: "4px" }} />
            <p>
               <a className="button button_solid" href="/">
                  ทำแบบทดสอบอีกครั้ง
               </a>
            </p>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { Member: state.form.Member };
};

export default connect(
   mapStateToProps,
   { changeStepAction }
)(ThankYou);
