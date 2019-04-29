// import moment from './libs/moment/src/moment' // quiet

const curr_date = {
	year : moment().year(),
	month: moment().month(),
	date: moment().date(),
	total_days: moment().daysInMonth()
};

var date_input = document.querySelector( 'input[name="day"]' ),
	month_input = document.querySelector( 'input[name="month"]'),
	year_input = document.querySelector( 'input[name="year"]' );
		
var date_input_val = date_input.value,
	month_input_val = month_input.value,
	year_input_val = year_input.value;	

var date_list = document.querySelector( '.item-list_date' ),
	month_list = document.querySelector( '.item-list_month' ),
	year_list = document.querySelector( '.item-list_year' ),
	date_track = document.querySelector( '.date-spinner__track_date' ),
	month_track = document.querySelector( '.date-spinner__track_month' ),
	year_track = document.querySelector( '.date-spinner__track_year' );
		
let new_birth_date = moment( year_input_val +'-'+ month_input_val +'-'+ date_input_val, 'YYYY-M-D' );

let birth_date = {
	year : new_birth_date.year(),
	month: new_birth_date.month(),
	date: new_birth_date.date(),
	total_days: new_birth_date.daysInMonth()
};

console.log( birth_date );

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
}

function apply_spinner_input_val( el ) {
	if ( el == null ) return;
	
	var min_v = parseInt( el.getAttribute( 'min' ) ),
		max_v = parseInt( el.getAttribute( 'max' ) ),
		el_name = el.getAttribute( 'name' );
		
	console.log( el_name );
	
	if ( el.value !== '' && el.valueAsNumber >= min_v && el.valueAsNumber <= max_v ) {

		let parent_block = el.closest( '.date-spinner__block' ),
			curr_selected = parent_block.querySelector( '.item-list .selected' ),
			target = parent_block.querySelector( '.item-list span[data-value="'+el.value+'"]' );
		
		if ( target ) {
			curr_selected.classList.remove( 'selected' );
			target.classList.add( 'selected' );
			setTimeout( () => { spinner_select( target ) }, 300 );
			
			if ( el_name === 'temp_day' ) {
				date_input.value = el.value;
			} else if ( el_name === 'temp_month' ) {
				month_input.value = el.value;
			} else if ( el_name === 'temp_year' ) {
				year_input.value = el.value;
			}
		}
		
	} else if ( el.value !== '' && el.valueAsNumber < min_v || el.valueAsNumber > max_v ) {
		
		alert( 'Please enter value between '+min_v+' - '+max_v+'' );
		el.value = '';
		
	} else {
		
		let block_edit = document.querySelectorAll( '.date-spinner__block' );
		for ( let item of block_edit ) {
			item.classList.remove( 'edit' );
		}
		
	}
}

function check_spinner_input_val( el ) {
	if ( el == null ) return;
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
			} else {
				// Act Normal
			}
		}
	);
}

function set_current_date_input( obj ) {
	date_input.setAttribute( 'value', obj.date );
	month_input.setAttribute( 'value', obj.month );
	year_input.setAttribute( 'value', obj.year );
}

function set_current_date_spinner( obj ) {
	for ( let i = 1; i <= obj.total_days; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
	
		if ( i === obj.date ) {
			item.setAttribute( 'class', 'selected' );
		}
	
		item.innerHTML = i;
		
		item.addEventListener('click', function(){
			input_edit(this);
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
		
		item.addEventListener('click', function(){
			input_edit(this);
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
		
		item.addEventListener('click', function(){
			input_edit(this);
		});
		
		year_list.appendChild( item );
	}
}

function set_birth_date_spinner( obj ) {
	
	for ( let i = 1; i <= obj.total_days; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
	
		if ( i === obj.date ) {
			item.setAttribute( 'class', 'selected' );
		}
	
		item.innerHTML = i;
		
		item.addEventListener('click', function(){
			input_edit(this);
		});
		
		date_list.appendChild( item );
	}
	
	for ( let i = 1; i <= 12; i++ ) {
		let item = document.createElement( 'span' );
		item.setAttribute( 'data-value', i );
	
		if ( i === ( obj.month + 1 ) ) {
			item.setAttribute( 'class', 'selected' );
		}
	
		item.innerHTML = i;
		
		item.addEventListener('click', function(){
			input_edit(this);
		});
		
		month_list.appendChild( item );
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
		
		item.addEventListener('click', function(){
			input_edit(this);
		});
		
		year_list.appendChild( item );
	}
}

if ( date_input_val === '' || month_input_val === '' || year_input_val === '' ) {
	set_current_date_input( curr_date );
	set_current_date_spinner( curr_date );
} else {
	set_birth_date_spinner( birth_date );
}

var selected_items = document.querySelectorAll( '.item-list .selected' ),
	selected_date = document.querySelector( '.item-list_date .selected' ),
	selected_month = document.querySelector( '.item-list_month .selected' ),
	selected_year = document.querySelector( '.item-list_year .selected' );

function spinner_select( el ) {
	el.scrollIntoView({
		behavior : 'smooth',
		block : 'center'
	});
	
	setTimeout( () => {
		let spinner_blocks = document.querySelectorAll( '.date-spinner__block' );
		for ( let spinner_block of spinner_blocks ) {
			spinner_block.classList.remove( 'edit' );
		}		
	}, 300 );
}

check_spinner_input_val( document.querySelector( 'input[name="temp_day"]' ) );
check_spinner_input_val( document.querySelector( 'input[name="temp_month"]' ) );
check_spinner_input_val( document.querySelector( 'input[name="temp_year"]' ) );

function repopulate_date_spinner() {
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
		
		item.addEventListener('click', function(){
			input_edit(this);
		});
		
		date_list.appendChild( item );
	}
	
	date_track.scroll(0,( ( max_select_date - 1 ) * 60 ));
	
	document.querySelector( 'input[name="temp_day"]' ).setAttribute( 'max', selected_date_obj.total_days );
	check_spinner_input_val( document.querySelector( 'input[name="temp_day"]' ) );
}

// Set Initial Date
for ( let i = 0; i < selected_items.length; i++ ) {
	selected_items[i].scrollIntoView({
		block : 'center'
	});
}

let spinner_down = document.querySelectorAll( '.spinner-arrow_down' ),
	spinner_up = document.querySelectorAll( '.spinner-arrow_up' );

for ( let i of spinner_down ) {
	i.addEventListener(
		'click',
		function(e) {
			e.preventDefault();
			let track = this.parentNode.querySelector( '.date-spinner__track' ),
				curr_selected = track.querySelector( '.selected' ),
				target = curr_selected.nextSibling;

			if ( target ) {
				let target_val = target.getAttribute('data-value');
				
				curr_selected.classList.remove( 'selected' );
				target.classList.add( 'selected' );
				
				if ( track.classList.contains( 'date-spinner__track_date' ) ) {
					date_input.setAttribute( 'value', target_val );
					
				} else if ( track.classList.contains( 'date-spinner__track_month' ) ) {
					month_input.setAttribute( 'value', target_val );
					date_track.scroll(0,0);
					repopulate_date_spinner();
				} else if ( track.classList.contains( 'date-spinner__track_year' ) ) {
					year_input.setAttribute( 'value', target_val );
					date_track.scroll(0,0);
					repopulate_date_spinner();
				}
				
				spinner_select( target );
				
			}

		}
	);
}

for ( let i of spinner_up ) {
	i.addEventListener(
		'click',
		function(e) {
			e.preventDefault();
			let track = this.parentNode.querySelector( '.date-spinner__track' ),
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
				
				spinner_select( target );
				
			}

		}
	);
}

document.addEventListener( 'keyup', (e) => {
	if ( e.keyCode === 27 ) {
		document.querySelector( '.date-spinner__block.edit' ).classList.remove( 'edit' );
	}
});
