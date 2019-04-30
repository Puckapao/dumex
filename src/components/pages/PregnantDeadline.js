import React, { Component } from "react";
import { connect } from "react-redux";
import { pregnantDeadlineAction, changeStepAction } from "../../actions";
import Calendar from "./Calendar";

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

   componentDidMount() {
      let { due_date } = this.props.Member;
      if (due_date === "1970-01-01" || !due_date) due_date = "2019-04-30";

      const day = due_date.split("-")[2];
      const month = due_date.split("-")[1];
      const year = due_date.split("-")[0];

      this.setState({ day, month, year });

      // console.log(this.props.childrenId);
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

      this.setState(
         {
            day: this.dateInput.current.value,
            month: this.monthInput.current.value,
            year: this.yearInput.current.value
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

            <Calendar
               dateInput={this.dateInput}
               monthInput={this.monthInput}
               yearInput={this.yearInput}
               day={this.state.day}
               month={this.state.month}
               handleChange={this.handleChange}
            />

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
      childrenId: state.form.Children.id
   };
};

export default connect(
   mapStateToProps,
   { pregnantDeadlineAction, changeStepAction }
)(PregnantDeadline);
