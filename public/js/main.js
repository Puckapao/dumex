const curr_date = {
	year : moment().year(),
	month: moment().month(),
	date: moment().date(),
	total_days: moment().daysInMonth()
};

var date_input = document.querySelector( 'input[name="day"]' ),
	month_input = document.querySelector( 'input[name="month"]'),
	year_input = document.querySelector( 'input[name="year"]' );

var date_input_val = ( date_input ? date_input.value : '' ),
	month_input_val = ( month_input ? month_input.value : '' ),
	year_input_val = ( year_input ? year_input.value : '' );

var date_list = document.querySelector( '.item-list_date' ),
	month_list = document.querySelector( '.item-list_month' ),
	year_list = document.querySelector( '.item-list_year' ),
	date_track = document.querySelector( '.date-spinner__track_date' );

let new_birth_date = moment( year_input_val +'-'+ month_input_val +'-'+ date_input_val, 'YYYY-M-D' );

let birth_date = {
	year : new_birth_date.year(),
	month: new_birth_date.month(),
	date: new_birth_date.date(),
	total_days: new_birth_date.daysInMonth()
};

var input_edit = (el) => {
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

var apply_spinner_input_val = ( el ) => {
	//console.log('in2');
	if ( el == null ) { return; }

	var min_v = parseInt( el.getAttribute( 'min' ) ),
		max_v = parseInt( el.getAttribute( 'max' ) ),
		el_name = el.getAttribute( 'name' );

	// console.log( el_name );

	if ( el.value !== '' && el.valueAsNumber >= min_v && el.valueAsNumber <= max_v ) {

		let parent_block = el.closest( '.date-spinner__block' ),
			curr_selected = parent_block.querySelector( '.item-list .selected' ),
			target = parent_block.querySelector( '.item-list span[data-value="'+el.value+'"]' );

		if ( target ) {
			curr_selected.classList.remove( 'selected' );
			target.classList.add( 'selected' );
			setTimeout( () => { spinner_select( target, 150 ) }, 300 );

			if ( el_name === 'temp_day' ) {
				date_input.value = el.value;
			} else if ( el_name === 'temp_month' ) {
				month_input.value = el.value;
			} else if ( el_name === 'temp_year' ) {
				year_input.value = el.value;
			}

			remove_spinner_edit( el );
		}

	} else if ( el.value !== '' && el.valueAsNumber < min_v || el.valueAsNumber > max_v ) {

		//alert( 'Please enter value between '+min_v+' - '+max_v+'' );
		el.value = '';

	} else {
		remove_spinner_edit( el );
	}

};

// Check Spinner Input Value
var check_spinner_input_val = ( el ) => {
	if ( el == null ) { return; }

	el.addEventListener(
		'blur',
		() => {
			apply_spinner_input_val( el );
		}
	);

	el.addEventListener(
		'keyup',
		(e) => {
			if ( e.keyCode === 13 ) {
				apply_spinner_input_val( el );
			}
		}
	);
};

var set_current_date_input = ( obj ) => {
	date_input.value = obj.date;
	month_input.value = obj.month;
	year_input.value = obj.year;
};

// Set Current Date Spinner
var set_current_date_spinner = ( obj ) => {
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

		date_list.appendChild( item );
	}

	for ( let i = 1; i <= 12; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );

		if ( i === obj.month ) {
			item.setAttribute( 'class', 'selected' );
		}

		item.innerHTML = i;

		item.addEventListener('click', () => {
			input_edit(item);
		});

		month_list.appendChild( item );
	}

	for ( let i = obj.year - 5; i <= obj.year + 5; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );

		if ( i === obj.year ) {
			item.setAttribute( 'class', 'selected' );
		}

		if ( i === obj.year - 5 ) {
			document.querySelector( 'input[name="temp_year"]' ).setAttribute( 'min', obj.year - 5 );
		} else if ( i === obj.year + 5 ) {
			document.querySelector( 'input[name="temp_year"]' ).setAttribute( 'max', obj.year + 5 );
		}

		item.innerHTML = i;

		item.addEventListener('click', () => {
			input_edit(item);
		});

		year_list.appendChild( item );
	}
};

// Set Birthday Date Spinner
var set_birth_date_spinner = ( obj ) => {

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

if ( date_input_val === '' || month_input_val === '' || year_input_val === '' ) {
	// set_current_date_input( curr_date );
	// set_current_date_spinner( curr_date );
} else {
	// set_birth_date_spinner( birth_date );
}

var spinner_select = ( el, dur = 150 ) => {

	if ( dur <= 0 ) { return; }

	let track = el.closest( '.date-spinner__track' ),
		target_pos = el.offsetTop - 60,
		difference = target_pos - track.scrollTop,
		distance = difference / dur * 10;

	setTimeout( () => {
		track.scrollTop = track.scrollTop + distance;
		if ( track.scrollTop === target_pos ) { return; }
		spinner_select( el, dur - 10 )
	}, 10 )
};

var remove_spinner_edit = ( input ) => {
	var active_input_parent = input.closest( '.date-spinner__block' );

	setTimeout( () => {
		input.blur();
		active_input_parent.classList.remove( 'edit' );
	}, 150 );
};

check_spinner_input_val( document.querySelector( 'input[name="temp_day"]' ) );
check_spinner_input_val( document.querySelector( 'input[name="temp_month"]' ) );
check_spinner_input_val( document.querySelector( 'input[name="temp_year"]' ) );

// Repopulate Date Spinner
var repopulate_date_spinner = () => {
	let remove_date = date_list.querySelectorAll( 'span' );
	for ( let item of remove_date ) {
		item.remove();
	}

	let new_date_obj = moment( year_input.value +'-'+ month_input.value, 'YYYY-M' );
	let max_select_date = ( date_input.value > new_date_obj.daysInMonth() ? new_date_obj.daysInMonth() : date_input.value );

	let selected_date_obj = {
		year : new_date_obj.year(),
		month: new_date_obj.month(),
		date: parseInt( max_select_date ),
		total_days: new_date_obj.daysInMonth()
	};

	for ( let i = 1; i <= selected_date_obj.total_days; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );

		if ( i === selected_date_obj.date ) {
			item.setAttribute( 'class', 'selected' );
		}

		item.innerHTML = i;

		item.addEventListener('click', () => {
			input_edit(item);
		});

		date_list.appendChild( item );
	}
	
	let target_pos = document.querySelector( 'span[data-value="'+max_select_date+'"]' ).offsetTop - 60;
	
	date_track.scroll(0,target_pos);

	document.querySelector( 'input[name="temp_day"]' ).setAttribute( 'max', selected_date_obj.total_days );
	document.querySelector( 'input[name="day"]' ).value = selected_date_obj.date;
	check_spinner_input_val( document.querySelector( 'input[name="temp_day"]' ) );
};

// Set Initial Date
var set_initial_date = () => {
	for ( let selected_item of document.querySelectorAll( '.item-list .selected' ) ) {
		let track = selected_item.closest( '.date-spinner__track' ),
			target_pos = selected_item.offsetTop - 60;
	
		track.scroll(0,target_pos);
	}
}

set_initial_date();

// Spinner Buttons
let spinner_down = document.querySelectorAll( '.spinner-arrow_down' ),
	spinner_up = document.querySelectorAll( '.spinner-arrow_up' );

// Spinner Down Button
for ( let i of spinner_down ) {
	i.addEventListener(
		'click',
		(e) => {
			e.preventDefault();
			let track = i.parentNode.querySelector( '.date-spinner__track' ),
				curr_selected = track.querySelector( '.selected' ),
				target = curr_selected.nextSibling;

			if ( target ) {
				let target_val = target.getAttribute('data-value');

				curr_selected.classList.remove( 'selected' );
				target.classList.add( 'selected' );

				if ( track.classList.contains( 'date-spinner__track_date' ) ) {
					date_input.value = target_val;

				} else if ( track.classList.contains( 'date-spinner__track_month' ) ) {
					month_input.value = target_val;
					date_track.scroll(0,0);
					repopulate_date_spinner();
				} else if ( track.classList.contains( 'date-spinner__track_year' ) ) {
					year_input.value = target_val;
					date_track.scroll(0,0);
					repopulate_date_spinner();
				}

				spinner_select( target, 150 );

			}

		}
	);
}

// Spinner Up Button
for ( let i of spinner_up ) {
	i.addEventListener(
		'click',
		(e) => {
			e.preventDefault();
			let track = i.parentNode.querySelector( '.date-spinner__track' ),
				curr_selected = track.querySelector( '.selected' ),
				target = curr_selected.previousSibling;


			if ( target ) {
				let target_val = target.getAttribute('data-value');

				curr_selected.classList.remove( 'selected' );
				target.classList.add( 'selected' );

				if ( track.classList.contains( 'date-spinner__track_date' ) ) {
					date_input.value = target_val;

				} else if ( track.classList.contains( 'date-spinner__track_month' ) ) {
					month_input.value = target_val;
					// date_track.scroll(0,0);
					repopulate_date_spinner();
				} else if ( track.classList.contains( 'date-spinner__track_year' ) ) {
					year_input.value = target_val;
					// date_track.scroll(0,0);
					repopulate_date_spinner();
				}

				spinner_select( target, 150 );

			}

		}
	);
}

// Check ESC Key
document.addEventListener(
	'keyup',
	(e) => {
		if ( e.keyCode === 27 ) {
			document.querySelector( '.date-spinner__block.edit' ).classList.remove( 'edit' );
		}
	}
);

// Next Spinner Input via Tab Key
var spinner_input_nodes = document.querySelectorAll( '.spinner-input' );

for ( let input of spinner_input_nodes ) {
	input.addEventListener(
		'keyup',
		(e) => {
			if ( e.keyCode === 9 ) {
				let curr_input = input.tabIndex - 1,
					next_input = document.querySelector( '.spinner-input[tabindex="'+( curr_input + 1 )+'"]' ),
					next_input_parent = next_input.closest( '.date-spinner__block' );

				if ( next_input ) {
					next_input_parent.classList.add( 'edit' );
					next_input.focus();
				}
			}
		}
	);
}

const { get, set } = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

// Object.defineProperty(document.querySelector( 'input[name="temp_day"]' ), 'value', {
// 	get() {
// 		return get.call(this);
// 	},
// 	set(newVal) {
// 		if(newVal.length > 1 && newVal.slice(0,1) === "0") {
// 			newVal = newVal.slice(1);
// 		}
// 		console.log("updated value: " + newVal);
// 		// console.log('New value assigned to input: ' + newVal);
// 		if(newVal) {
// 			apply_spinner_input_val(document.querySelector( 'input[name="temp_day"]' ));
// 		};
// 		return set.call(this, newVal);
// 	}
// });

// Object.defineProperty(document.querySelector( 'input[name="temp_month"]' ), 'value', {
// 	get() {
// 		return get.call(this);
// 	},
// 	set(newVal) {
// 		if(newVal.length > 1 && newVal.slice(0,1) === "0") {
// 			newVal = newVal.slice(1);
// 		}
		
// 		// console.log(newVal);
// 		// console.log('New value assigned to input: ' + newVal);
// 		if(newVal) {
// 			apply_spinner_input_val(document.querySelector( 'input[name="temp_month"]' ));
// 		};
// 		return set.call(this, newVal);
// 	}
// });

// Object.defineProperty(document.querySelector( 'input[name="temp_year"]' ), 'value', {
// 	get() {
// 		return get.call(this);
// 	},
// 	set(newVal) {
// 		if(newVal.length > 1 && newVal.slice(0,1) === "0") {
// 			newVal = newVal.slice(1);
// 		}
// 		// console.log(newVal);
// 		// console.log('New value assigned to input: ' + newVal);
// 		if(newVal) {
// 			apply_spinner_input_val(document.querySelector( 'input[name="temp_year"]' ));
// 		};
// 		return set.call(this, newVal);
// 	}
// });

// // Mobile Menu Trigger
// var nav_trigger = document.querySelector( '.menu-trigger' );

// nav_trigger.addEventListener(
// 	'click',
// 	(e) => {
// 		e.preventDefault();
// 		document.querySelector( 'body' ).classList.toggle( 'showmenu' );
// 	}
// );