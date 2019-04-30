import React from "react";

const script = document.createElement("script");

function init() {
   script.src = "../../js/main.js";
   script.async = true;
   script.id = "calendar";
   script.unload = () => this.scriptLoaded();
   document.body.appendChild(script);
}

function destroy() {
   document.body.removeChild(script);
}

// dateInput, monthInput, yearInput
// day, month, year
// handleChange
function Calendar(props) {
   init();
   destroy();
   return (
      <div>
         <input
            type="hidden"
            id="date_input"
            ref={props.dateInput}
            name="day"
            value={Number(props.day)}
            onChange={props.handleChange}
         />
         <input
            type="hidden"
            id="month_input"
            ref={props.monthInput}
            name="month"
            value={Number(props.month)}
            onChange={props.handleChange}
         />
         <input
            type="hidden"
            id="year_input"
            ref={props.yearInput}
            name="year"
            // value={Number(props.year)}
            onChange={props.handleChange}
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
      </div>
   );
}

export default Calendar;
