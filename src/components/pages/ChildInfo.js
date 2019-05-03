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

const set_initial_date = () => {
	for ( let selected_item of document.querySelectorAll( '.item-list .selected' ) ) {
		let track = selected_item.closest( '.date-spinner__track' ),
			target_pos = selected_item.offsetTop - 60;
		track.scroll(0,target_pos);
	}
}

const date_list = document.querySelector( '.item-list_date' ),
	month_list = document.querySelector( '.item-list_month' ),
   year_list = document.querySelector( '.item-list_year' );

const input_edit = (el) => {
   let spinner_blocks = document.querySelectorAll( '.date-spinner__block' ),
      parent_spinner_block = el.closest( '.date-spinner__block' ),
      target_spinner_input = parent_spinner_block.querySelector( '.spinner-input' );

   parent_spinner_block.classList.add( 'edit' );
   target_spinner_input.value = '';
   target_spinner_input.focus();

   for ( let spinner_block of spinner_blocks ) {
      if ( spinner_block !== parent_spinner_block ) {
         spinner_block.classList.remove( 'edit' );
      }
   }
};

const set_birth_date_spinner = ( obj ) => {
	for ( let i = 1; i <= obj.total_days; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
		if ( i === obj.date ) {
			item.setAttribute( 'class', 'selected' );
		}
		item.innerHTML = i;
		item.addEventListener('click', () => {
			input_edit(item);
		});
		if ( date_list ) {
			date_list.appendChild( item );
		}
	}

	for ( let i = 1; i <= 12; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
		if ( i === ( obj.month + 1 ) ) {
			item.setAttribute( 'class', 'selected' );
		}
		item.innerHTML = i;
		item.addEventListener('click', () => {
			input_edit(item);
		});
		if ( month_list ) {
			month_list.appendChild( item );
		}
	}

	for ( let i = obj.year - 2; i <= obj.year; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
		if ( i === obj.year ) {
			item.setAttribute( 'class', 'selected' );
		}
		if ( i === obj.year - 2 ) {
			document.querySelector( 'input[name="temp_year"]' ).setAttribute( 'min', obj.year - 2 );
		} else if ( i === obj.year ) {
			document.querySelector( 'input[name="temp_year"]' ).setAttribute( 'max', obj.year );
		}
		item.innerHTML = i;
		item.addEventListener('click', () => {
			input_edit(item);
		});
		if ( year_list ) {
			year_list.appendChild( item );
		}
	}
};

const total_days_in_month = ( year, month ) => {
   return new Date(year, month, 0).getDate();
}

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

   componentWillMount() {
      set_initial_date();
   };

   componentDidMount() {
      dateSpinner = document.getElementById("date_spinner");
      newSpinner = document.getElementById("new_spinner");
      dateSpinner.removeAttribute("class");

      let { birthday } = this.props.Children;
      const { baby_name } = this.props.Children;

      // console.log("birthday", birthday);

      if (!birthday) birthday = "--";
      if (birthday === "1970-01-01" || !birthday) birthday = "2019-04-30";

      const day = birthday.split("-")[2];
      const month = birthday.split("-")[1];
      const year = birthday.split("-")[0];

      const birth_date_obj = {
         year : parseInt(year),
         month: parseInt(month) - 1,
         date: parseInt(day),
         total_days: total_days_in_month( parseInt(year), parseInt(month) )
      };

      let remove_date = document.querySelector('.item-list').querySelectorAll( 'span' );
      for ( let item of remove_date ) {
         item.remove();
      }

      set_birth_date_spinner( birth_date_obj );

      this.setState({ baby_name, day, month, year }, () => {
         set_initial_date();

         document.querySelector('input[name="day"]').value = day;
         document.querySelector('input[name="month"]').value = month;
         document.querySelector('input[name="year"]').value = year;
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
            const { baby_name, day, month, year } = this.state;
            const birthday = `${year}-${month}-${day}`;
            // console.log(birthday);

            // Todo: Form Validate ****
            this.props.childInfoAction(
               baby_name,
               birthday,
               this.props.memberId
            );

            // console.log("birthday", birthday);

            this.props.changeStepAction("5.2B");

            // document.body.removeChild(script);
         }
      );
   };

   backStep = () => {
      this.props.changeStepAction("4");
   };

   render() {
      return (
         <React.Fragment>
            <p className="backButton">
               <button
                  className="button button_solid backButton_small"
                  onClick={this.backStep}
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
                  onClick={this.backStep}
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
