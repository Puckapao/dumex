import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfoAction, changeStepAction } from "../../actions";

// const script = document.createElement("script");
var dateInput = null;
var monthInput = null;
var yearInput = null;
var tempDayInput = null;
var tempMonthInput = null;
var tempYearInput = null;
var dateSpinner = null;
var calendarScript = null;
var newSpinner = null;

class ChildInfo extends Component {
   constructor(props) {
      super(props);
   }

   state = {
      baby_name: "",
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      dateSpinner = document.getElementById("date_spinner");
      newSpinner = document.getElementById("new_spinner");
      dateSpinner.removeAttribute("class");

      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;

      console.log("birthday", birthday);

      if (!birthday) birthday = "--";
      if (birthday === "1970-01-01" || !birthday) birthday = "2019-04-30";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      this.setState({ day, month, year }, () => {
         tempDayInput = document.getElementById("temp_day");
         tempMonthInput = document.getElementById("temp_month");
         tempYearInput = document.getElementById("temp_year");
         // console.log(tempDayInput.value);
         // console.log(tempMonthInput.value);
         // console.log(tempYearInput.value);

         tempDayInput.value = this.state.day;
         tempMonthInput.value = this.state.month;
         tempYearInput.value = this.state.year;
      });

      while (dateSpinner.childNodes.length > 0) {
         newSpinner.appendChild(dateSpinner.childNodes[0]);
      }
   }

   componentWillMount() {}

   componentWillUnmount() {
      while (newSpinner.childNodes.length > 0) {
         dateSpinner.appendChild(newSpinner.childNodes[0]);
      }
      dateSpinner.setAttribute("class", "hidden");
      dateInput = null;
      monthInput = null;
      yearInput = null;
      tempDayInput = null;
      tempMonthInput = null;
      tempYearInput = null;
      dateSpinner = null;
      calendarScript = null;
      newSpinner = null;
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();
      dateInput = document.getElementById("day");
      monthInput = document.getElementById("month");
      yearInput = document.getElementById("year");

      // console.log(dateInput.value);
      // console.log(monthInput.value);
      // console.log(yearInput.value);

      this.setState(
         {
            day: dateInput.value,
            month: monthInput.value,
            year: yearInput.value
         },
         () => {
            const { baby_name, day, month, year } = this.state;
            const birthday = `${year}-${month}-${day}`;

            // Todo: Form Validate ****
            this.props.childInfoAction(
               baby_name,
               birthday,
               this.props.memberId
            );

            console.log("birthday", birthday);

            this.props.changeStepAction("5.2B");

            // document.body.removeChild(script);
         }
      );
   };

   render() {
      return (
         <React.Fragment>
            <p className="backButton">
               <button
                  className="button button_solid backButton_small"
                  onClick={this.changeStep.bind(this, "4")}
               >
                  กลับ
               </button>
            </p>
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

            <div id="new_spinner" />

            {/* <div className="form-notice">สามารถเลื่อนซ้ายขวาเพื่อเลือกได้</div> */}
            <div className="form-step">
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
                  className="form-step__nav form-step__nav_prev"
                  href="#"
                  onClick={this.changeStep.bind(this, "4")}
               >
                  กลับ
               </a>
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
