import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfoAction, changeStepAction } from "../../actions";

// import { TextInput, Button } from "../reuse";

class ChildInfo extends Component {
   state = {
      baby_name: "",
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      const script = document.createElement("script");
      script.src = "../../js/main.js";
      script.async = true;
      script.unload = () => this.scriptLoaded();

      document.body.appendChild(script);

      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;

      if (!birthday) birthday = "--";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      this.setState({ baby_name, day, month, year });
   }

   handleChange = e => {
      console.log(e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { baby_name, day, month, year } = this.state;
      // const birthday = `${year}-${month}-${day}`;
      const birthday = "2015-12-30";

      // Todo: Form Validate ****
      this.props.childInfoAction(baby_name, birthday, this.props.memberId);

      this.props.changeStepAction("5.2B");
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>คุณแม่คลอดบุตรแล้ว</h1>
            <h5>รายละเอียดลูกน้อย</h5>
            <TextInput
               name="baby_name"
               value={this.state.baby_name}
               onChange={this.handleChange}
            >
               ชื่อบุตร
            </TextInput>
            <p>วันเกิด</p>
            <TextInput
               name="day"
               value={this.state.day}
               onChange={this.handleChange}
            >
               วันที่
            </TextInput>
            <TextInput
               name="month"
               value={this.state.month}
               onChange={this.handleChange}
            >
               เดือน
            </TextInput>
            <TextInput
               name="year"
               value={this.state.year}
               onChange={this.handleChange}
            >
               ปี
            </TextInput>

            <Button onClick={this.changeStep.bind(this, "4")}>กลับ</Button>
            <Button onClick={this.handleSubmitForm}>ต่อไป</Button> */}
            <h1 className="header">คุณแม่คลอดบุตรแล้ว</h1>
            <h2 className="sub-header">รายละเอียดลูกน้อย</h2>
            <p>
               <span className="input-wrapper">
                  <input
                     className="input input_type_text"
                     type="text"
                     name="baby_name"
                     value={this.state.baby_name}
                     onChange={this.handleChange}
                  />
               </span>
            </p>
            <h3>วันเกิด</h3>

            {/* need to change */}
            <input
               type="hidden"
               name="day"
               value={this.state.day}
               onChange={this.handleChange}
            />
            <input
               type="hidden"
               name="month"
               value={this.state.month}
               onChange={this.handleChange}
            />
            <input
               type="hidden"
               name="year"
               value={this.state.year}
               onChange={this.handleChange}
            />

            <div className="date-spinner date-spinner_birth-day">
               <div className="date-spinner__block">
                  <div className="date-spinner__track date-spinner__track_date">
                     <div className="item-list item-list_date" />
                  </div>
                  <span className="spinner-arrow spinner-arrow_up" />
                  <span className="spinner-arrow spinner-arrow_down" />
                  <span className="spinner-label">วันที่</span>
               </div>
               <div className="date-spinner__block">
                  <div className="date-spinner__track date-spinner__track_month">
                     <div className="item-list item-list_month" />
                  </div>
                  <span className="spinner-arrow spinner-arrow_up" />
                  <span className="spinner-arrow spinner-arrow_down" />
                  <span className="spinner-label">เดือน</span>
               </div>
               <div className="date-spinner__block">
                  <div className="date-spinner__track date-spinner__track_year">
                     <div className="item-list item-list_year" />
                  </div>
                  <span className="spinner-arrow spinner-arrow_up" />
                  <span className="spinner-arrow spinner-arrow_down" />
                  <span className="spinner-label">ปี</span>
               </div>
            </div>

            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div className="form-step">
               <a
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "4")}
               >
                  กลับ
               </a>
               <div className="step">
                  <a href="#" className="step__item">
                     <span>1</span>
                  </a>
                  <a href="#" className="step__item current">
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
                  onClick={this.handleSubmitForm}
               >
                  ต่อไป
               </a>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return { Children: state.form.Children, memberId: state.form.memberId };
};

export default connect(
   mapStateToProps,
   { childInfoAction, changeStepAction }
)(ChildInfo);
