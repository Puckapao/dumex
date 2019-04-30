import React, { Component } from "react";
import { connect } from "react-redux";
import { childInfoAction, changeStepAction } from "../../actions";

// import { TextInput, Button } from "../reuse";

const script = document.createElement("script");

class ChildInfo extends Component {
   constructor(props) {
      super(props);

      this.dateInput = React.createRef();
      this.monthInput = React.createRef();
      this.yearInput = React.createRef();
   };
   
   state = {
      baby_name: "",
      day: "",
      month: "",
      year: ""
   };

   componentDidMount() {
      // const script = document.createElement("script");
      script.src = "../../js/main.js";
      script.async = true;
      script.id = "calendar";
      script.unload = () => this.scriptLoaded();

      document.body.appendChild(script);

      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;

      if (!birthday) birthday = "--";
      if (birthday === "1970-01-01" || !birthday) birthday = "2019-04-30";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      this.setState({ baby_name, day, month, year });
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   changeStep = newStep => {
      this.props.changeStepAction(newStep);
   };

   handleSubmitForm = e => {
      e.preventDefault();
      // console.log(this.dateInput.current.value);
      // console.log(this.monthInput.current.value);
      // console.log(this.yearInput.current.value);

      this.setState({
         day: this.dateInput.current.value,
         month: this.monthInput.current.value,
         year: this.yearInput.current.value,
      }, () => {
         const { baby_name, day, month, year } = this.state;
         const birthday = `${year}-${month}-${day}`;

         // Todo: Form Validate ****
         this.props.childInfoAction(baby_name, birthday, this.props.memberId);

         this.props.changeStepAction("5.2B");

         //document.body.removeChild(script);
      });
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

            {/* need to change */}
            <input
               type="hidden"
               id="date_input"
               ref={this.dateInput}
               name="day"
               value={Number(this.state.day)}
               onChange={this.handleChange}
            />
            <input
               type="hidden"
               id="month_input"
               ref={this.monthInput}
               name="month"
               value={Number(this.state.month)}
               onChange={this.handleChange}
            />
            <input
               type="hidden"
               id="year_input"
               ref={this.yearInput}
               name="year"
               value={Number(this.state.year)}
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
            </div>

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
