import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { pregnantDeadlineAction, changeStepAction } from "../../actions";

// import { TextInput, Button } from "../reuse";

const script = document.createElement("script");

class PregnantDeadline extends Component {
   state = {
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      //script = document.createElement("script");
      script.src = "../../js/main.js";
      script.async = true;
      script.id = "calendar"
      script.unload = () => this.scriptLoaded();

      document.body.appendChild(script);

      let { due_date } = this.props.Member;
      if (!due_date) due_date = "--";

      const day = due_date.split("-")[2];
      const month = due_date.split("-")[1];
      const year = due_date.split("-")[0];

      this.setState({ day, month, year });
   };

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();

      const { day, month, year } = this.state;
      const due_date = `${year}-${month}-${day}`;

      // Todo: Form Validate *****
      this.props.pregnantDeadlineAction(due_date, this.props.memberId);
      
      this.props.changeStepAction("6");
      
      document.body.removeChild(script);
   };

   render() {
      return (
         <React.Fragment>
            {/* <h1>คุณแม่กำลังตั้งครรภ์</h1>
            <h5>กำหนดคลอด</h5> */}

            {/* <TextInput
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
            <h1 className="header">คุณแม่ที่กำลังตั้งครรภ์</h1>
            <h2 className="sub-header">กำหนดคลอด</h2>

            <input
               type="hidden"
               name="day"
               onChange={this.handleChange}
               value={this.state.day}
            />
            <input
               type="hidden"
               name="month"
               onChange={this.handleChange}
               value={this.state.month}
            />
            <input
               type="hidden"
               name="year"
               onChange={this.handleChange}
               value={this.state.year}
            />

            <div className="date-spinner date-spinner_expect-date">
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
   return { Member: state.form.Member, memberId: state.form.memberId };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
