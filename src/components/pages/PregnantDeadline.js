import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantDeadlineAction, changeStepAction } from "../../actions";

// const script = document.createElement("script");
let dateInput = null;
let monthInput = null;
let yearInput = null;
let tempDayInput = null;
let tempMonthInput = null;
let tempYearInput = null;
let dateSpinner = null;
let calendarScript = null;
let newSpinner = null;

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

   componentWillMount() {
      
   }

   componentDidMount() {
      dateSpinner = document.getElementById("date_spinner");
      newSpinner = document.getElementById("new_spinner");
      dateSpinner.removeAttribute("class");

      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;
      
      if (birthday === "1970-01-01" || !birthday) birthday = "2019-04-30";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      this.setState({ day, month, year }, () => {
         tempDayInput = document.getElementById("temp_day");
         tempMonthInput = document.getElementById("temp_month");
         tempYearInput = document.getElementById("temp_year");
         console.log(tempDayInput.value);
         console.log(tempMonthInput.value);
         console.log(tempYearInput.value);

         tempDayInput.value = this.state.day;
         tempMonthInput.value = this.state.month;
         tempYearInput.value = this.state.year;
      });

      while(dateSpinner.childNodes.length > 0) {
         newSpinner.appendChild(dateSpinner.childNodes[0]);
      }
   }

   componentWillUnmount() {
      while(newSpinner.childNodes.length > 0) {
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
            console.log(birthday);

            // Todo: Form Validate *****
            this.props.pregnantDeadlineAction(
               birthday,
               this.props.memberId,
               this.props.childrenId || null
            );

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

            <div id="new_spinner"></div>
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
      Children: state.form.Children,
      childrenId: state.form.Children.id
   };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
