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

const set_initial_date = () => {
   console.log("in");
   for (let selected_item of document.querySelectorAll(
      ".item-list .selected"
   )) {
      let track = selected_item.closest(".date-spinner__track"),
         target_pos = selected_item.offsetTop - 60;
      track.scroll(0, target_pos);
   }
};

const date_list = document.querySelector(".item-list_date"),
   month_list = document.querySelector(".item-list_month"),
   year_list = document.querySelector(".item-list_year");

const input_edit = el => {
   let spinner_blocks = document.querySelectorAll(".date-spinner__block"),
      parent_spinner_block = el.closest(".date-spinner__block"),
      target_spinner_input = parent_spinner_block.querySelector(
         ".spinner-input"
      );

   parent_spinner_block.classList.add("edit");
   target_spinner_input.value = "";
   target_spinner_input.focus();

   for (let spinner_block of spinner_blocks) {
      if (spinner_block !== parent_spinner_block) {
         spinner_block.classList.remove("edit");
      }
   }
};

const set_current_date_spinner = obj => {
   for (let i = 1; i <= obj.total_days; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.date) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;

      item.addEventListener("click", () => {
         input_edit(item);
      });

      date_list.appendChild(item);
   }

   for (let i = 1; i <= 12; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.month) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;

      item.addEventListener("click", () => {
         input_edit(item);
      });

      month_list.appendChild(item);
   }

   for (let i = obj.year - 5; i <= obj.year + 5; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.year) {
         item.setAttribute("class", "selected");
      }

      if (i === obj.year - 5) {
         document
            .querySelector('input[name="temp_year"]')
            .setAttribute("min", obj.year - 5);
      } else if (i === obj.year + 5) {
         document
            .querySelector('input[name="temp_year"]')
            .setAttribute("max", obj.year + 5);
      }

      item.innerHTML = i;

      item.addEventListener("click", () => {
         input_edit(item);
      });

      year_list.appendChild(item);
   }
};

const total_days_in_month = (year, month) => {
   return new Date(year, month, 0).getDate();
};

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
      set_initial_date();
   }

   componentDidMount() {
      dateSpinner = document.getElementById("date_spinner");
      newSpinner = document.getElementById("new_spinner");
      dateSpinner.removeAttribute("class");

      // let { due_date } = this.props.Member;
      const { birthday } = this.props.Children;
      let due_date = birthday;

      if (due_date === "1970-01-01" || !due_date) due_date = "2019-04-30";

      const day = due_date.split("-")[2];
      const month = due_date.split("-")[1];
      const year = due_date.split("-")[0];

      const now = new Date();
      const current_date_obj = {
         year: now.getFullYear(),
         month: now.getMonth() + 1,
         date: now.getDate(),
         total_days: total_days_in_month(parseInt(year), parseInt(month))
      };

      let remove_date = document
         .querySelector(".item-list")
         .querySelectorAll("span");
      for (let item of remove_date) {
         item.remove();
      }

      set_current_date_spinner(current_date_obj);

      this.setState({ day, month, year }, () => {
         // tempDayInput = document.getElementById("temp_day");
         // tempMonthInput = document.getElementById("temp_month");
         // tempYearInput = document.getElementById("temp_year");

         // tempDayInput.value = this.state.day;
         // tempMonthInput.value = parseInt(this.state.month - 1);
         // tempYearInput.value = this.state.year;

         set_initial_date();

         document.querySelector('input[name="day"]').value =
            current_date_obj.date;
         document.querySelector('input[name="month"]').value =
            current_date_obj.month;
         document.querySelector('input[name="year"]').value =
            current_date_obj.year;

         // console.log("tempDay", tempDayInput.value);
         // console.log("tempMonth", tempMonthInput.value);
         // console.log("tempYear", tempYearInput.value);
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
            // const due_date = "2019-04-30";
            console.log(due_date);

            // Todo: Form Validate *****
            this.props.pregnantDeadlineAction(
               due_date,
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
      Children: state.form.Children,
      childrenId: state.form.Children.id
   };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
