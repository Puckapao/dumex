import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantDeadlineAction, changeStepAction } from "../../actions";

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

class PregnantDeadline extends Component {
   constructor(props) {
      super(props);
      this.dateInput = React.createRef();
      this.monthInput = React.createRef();
      this.yearInput = React.createRef();
   }
   state = {
      day: "",
      month: "",
      year: ""
   };

   componentWillMount() {}

   componentDidMount() {
      dateSpinner = document.getElementById("date_spinner");
      newSpinner = document.getElementById("new_spinner");
      dateSpinner.removeAttribute("class");

      // let { due_date } = this.props.Member;
      const { birthday } = this.props.Children;
      let due_date = birthday;
      console.log("due_date", due_date);

      if (due_date === "1970-01-01" || !due_date) due_date = "2019-04-30";

      const day = due_date.split("-")[2];
      const month = due_date.split("-")[1];
      const year = due_date.split("-")[0];

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
            const { day, month, year } = this.state;
            const due_date = `${year}-${month}-${day}`;

            // Todo: Form Validate *****
            this.props.pregnantDeadlineAction(
               due_date,
               this.props.memberId,
               this.props.childrenId || null
            );

            console.log("due_date", due_date);

            this.props.changeStepAction("6");

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

            <div id="new_spinner" />
            {/* <input
               type="hidden"
               id="date_input"
               ref={this.dateInput}
               name="day"
               onChange={this.handleChange}
               value={this.state.day}
            />
            <input
               type="hidden"
               id="month_input"
               ref={this.monthInput}
               name="month"
               onChange={this.handleChange}
               value={this.state.month}
            />
            <input
               type="hidden"
               id="year_input"
               ref={this.yearInput}
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
                  <input
                     className="spinner-input"
                     type="number"
                     name="temp_day"
                     min="1"
                     max="31"
                     maxLength="2"
                  />
               </div>
               <div className="date-spinner__block">
                  <div className="date-spinner__track date-spinner__track_month">
                     <div className="item-list item-list_month" />
                  </div>
                  <span className="spinner-arrow spinner-arrow_up" />
                  <span className="spinner-arrow spinner-arrow_down" />
                  <span className="spinner-label">เดือน</span>
                  <input
                     className="spinner-input"
                     type="number"
                     name="temp_month"
                     min="1"
                     max="12"
                     maxLength="2"
                  />
               </div>
               <div className="date-spinner__block">
                  <div className="date-spinner__track date-spinner__track_year">
                     <div className="item-list item-list_year" />
                  </div>
                  <span className="spinner-arrow spinner-arrow_up" />
                  <span className="spinner-arrow spinner-arrow_down" />
                  <span className="spinner-label">ปี</span>
                  <input
                     className="spinner-input"
                     type="number"
                     name="temp_year"
                     min="2016"
                     max="2019"
                     maxLength="4"
                  />
               </div>
            </div> */}

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
   return {
      Member: state.form.Member,
      memberId: state.form.memberId,
      childrenId: state.form.Children.id,
      Children: state.form.Children
   };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
