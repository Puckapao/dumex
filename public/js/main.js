const curr_date = {
   year: moment().year(),
   month: moment().month(),
   date: moment().date(),
   total_days: moment().daysInMonth()
};

const date_input = document.querySelector('input[name="day"]'),
   month_input = document.querySelector('input[name="month"]'),
   year_input = document.querySelector('input[name="year"]');

let date_input_val = date_input.value,
   month_input_val = month_input.value,
   year_input_val = year_input.value;

let date_list = document.querySelector(".item-list_date"),
   month_list = document.querySelector(".item-list_month"),
   year_list = document.querySelector(".item-list_year"),
   date_track = document.querySelector(".date-spinner__track_date"),
   month_track = document.querySelector(".date-spinner__track_month"),
   year_track = document.querySelector(".date-spinner__track_year");

let new_birth_date = moment(
   year_input_val +
      (month_input_val < 10 ? "0" + month_input_val : month_input_val) +
      (date_input_val < 10 ? "0" + date_input_val : date_input_val)
);

let birth_date = {
   year: new_birth_date.year(),
   month: new_birth_date.month(),
   date: new_birth_date.date(),
   total_days: new_birth_date.daysInMonth()
};

function set_current_date_input(obj) {
   date_input.setAttribute("value", obj.date);
   month_input.setAttribute("value", obj.month);
   year_input.setAttribute("value", obj.year);
}

function set_current_date_spinner(obj) {
   for (let i = 1; i <= obj.total_days; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.date) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      date_list.appendChild(item);
   }

   for (let i = 1; i <= 12; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.month) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      month_list.appendChild(item);
   }

   for (let i = obj.year - 5; i <= obj.year + 5; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.year) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      year_list.appendChild(item);
   }
}

function set_birth_date_spinner(obj) {
   for (let i = 1; i <= obj.total_days; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.date) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      date_list.appendChild(item);
   }

   for (let i = 1; i <= 12; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.month + 1) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      month_list.appendChild(item);
   }

   for (let i = obj.year - 2; i <= obj.year; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === obj.year) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      year_list.appendChild(item);
   }
}

if (date_input_val === "" || month_input_val === "" || year_input_val === "") {
   set_current_date_input(curr_date);
   set_current_date_spinner(curr_date);
} else {
   set_birth_date_spinner(birth_date);
}

let selected_items = document.querySelectorAll(".item-list .selected"),
   selected_date = document.querySelector(".item-list_date .selected"),
   selected_month = document.querySelector(".item-list_month .selected"),
   selected_year = document.querySelector(".item-list_year .selected");

function spinner_select(el) {
   el.scrollIntoView({
      behavior: "smooth",
      block: "center"
   });
}

function repopulate_date_spinner() {
   let remove_date = date_list.querySelectorAll("span");
   for (let item of remove_date) {
      item.remove();
   }

   let new_date_obj = moment(
      year_input.value + "-" + month_input.value,
      "YYYY-M"
   );
   let max_select_date =
      date_input.value > new_date_obj.daysInMonth()
         ? new_date_obj.daysInMonth()
         : date_input.value;

   let selected_date_obj = {
      year: new_date_obj.year(),
      month: new_date_obj.month(),
      date: parseInt(1),
      total_days: new_date_obj.daysInMonth()
   };

   for (let i = 1; i <= selected_date_obj.total_days; i++) {
      let item = document.createElement("span");
      item.setAttribute("data-value", i);

      if (i === selected_date_obj.date) {
         item.setAttribute("class", "selected");
      }

      item.innerHTML = i;
      date_list.appendChild(item);
   }

   document.querySelector(".date-spinner__track_date").scroll(0, 0);
}

// Set Initial Date
for (let i = 0; i < selected_items.length; i++) {
   selected_items[i].scrollIntoView({
      block: "center"
   });
}

let spinner_down = document.querySelectorAll(".spinner-arrow_down"),
   spinner_up = document.querySelectorAll(".spinner-arrow_up");

for (let i of spinner_down) {
   i.addEventListener("click", function(e) {
      e.preventDefault();
      let track = this.parentNode.querySelector(".date-spinner__track"),
         curr_selected = track.querySelector(".selected"),
         target = curr_selected.nextSibling;

      if (target) {
         let target_val = target.getAttribute("data-value");

         target.setAttribute("class", "selected");
         curr_selected.removeAttribute("class");

         if (track.classList.contains("date-spinner__track_date")) {
            date_input.setAttribute("value", target_val);
         } else if (track.classList.contains("date-spinner__track_month")) {
            month_input.setAttribute("value", target_val);
            document.querySelector(".date-spinner__track_date").scroll(0, 0);
            repopulate_date_spinner();
         } else if (track.classList.contains("date-spinner__track_year")) {
            year_input.setAttribute("value", target_val);
            document.querySelector(".date-spinner__track_date").scroll(0, 0);
            repopulate_date_spinner();
         }
         spinner_select(target);
      }
   });
}

for (let i of spinner_up) {
   i.addEventListener("click", function(e) {
      e.preventDefault();
      let track = this.parentNode.querySelector(".date-spinner__track"),
         curr_selected = track.querySelector(".selected"),
         target = curr_selected.previousSibling;

      if (target) {
         let target_val = target.getAttribute("data-value");

         target.setAttribute("class", "selected");
         curr_selected.removeAttribute("class");

         if (track.classList.contains("date-spinner__track_date")) {
            date_input.setAttribute("value", target_val);
         } else if (track.classList.contains("date-spinner__track_month")) {
            month_input.setAttribute("value", target_val);
            document.querySelector(".date-spinner__track_date").scroll(0, 0);
            repopulate_date_spinner();
         } else if (track.classList.contains("date-spinner__track_year")) {
            year_input.setAttribute("value", target_val);
            document.querySelector(".date-spinner__track_date").scroll(0, 0);
            repopulate_date_spinner();
         }
         spinner_select(target);
      }
   });
}
