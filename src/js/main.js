const curr_date = {
	year : moment().year(),
	month: moment().month(),
	date: moment().date(),
	total_days: moment().daysInMonth()
};

const 	date_input = document.querySelector( 'input[name="day"]' ),
		month_input = document.querySelector( 'input[name="month"]'),
		year_input = document.querySelector( 'input[name="year"]' );

const 	date_list = document.querySelector( '.item-list_date' ),
		month_list = document.querySelector( '.item-list_month' ),
		year_list = document.querySelector( '.item-list_year' ),
		date_track = document.querySelector( '.date-spinner__track_date' ),
		month_track = document.querySelector( '.date-spinner__track_month' ),
		year_track = document.querySelector( '.date-spinner__track_year' );

for ( let i = 1; i <= curr_date.total_days; i++ ) {
	let item = document.createElement( 'span' );
	item.setAttribute( 'data-value', i );

	if ( i === curr_date.date ) {
		item.setAttribute( 'class', 'selected' );
	}

	item.innerHTML = i;
	date_list.appendChild( item );
}

for ( let i = 1; i <= 12; i++ ) {
	let item = document.createElement( 'span' );
	item.setAttribute( 'data-value', i );

	if ( i === curr_date.month ) {
		item.setAttribute( 'class', 'selected' );
	}

	item.innerHTML = i;
	month_list.appendChild( item );
}

for ( let i = curr_date.year - 5; i <= curr_date.year + 5; i++ ) {
	let item = document.createElement( 'span' );
	item.setAttribute( 'data-value', i );

	if ( i === curr_date.year ) {
		item.setAttribute( 'class', 'selected' );
	}

	item.innerHTML = i;
	year_list.appendChild( item );
}

let selected_items = document.querySelectorAll( '.item-list .selected' ),
	selected_date = document.querySelector( '.item-list_date .selected' ),
	selected_month = document.querySelector( '.item-list_month .selected' ),
	selected_year = document.querySelector( '.item-list_year .selected' );

function spinner_select( el ) {
	el.scrollIntoView({
		behavior : 'smooth',
		block : 'center'
	});
}

// Set Initial Date
date_input.setAttribute( 'value', curr_date.date );
month_input.setAttribute( 'value', curr_date.month + 1 );
year_input.setAttribute( 'value', curr_date.year );

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
				
				target.setAttribute( 'class', 'selected' );
				curr_selected.removeAttribute( 'class' );
				spinner_select( target );

				if ( track.classList.contains( 'date-spinner__track_date' ) ) {
					date_input.setAttribute( 'value', target_val );
				} else if ( track.classList.contains( 'date-spinner__track_month' ) ) {
					month_input.setAttribute( 'value', target_val );
				} else if ( track.classList.contains( 'date-spinner__track_year' ) ) {
					year_input.setAttribute( 'value', target_val );
				}
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
				
				target.setAttribute( 'class', 'selected' );
				curr_selected.removeAttribute( 'class' );
				spinner_select( target );
				
				if ( track.classList.contains( 'date-spinner__track_date' ) ) {
					date_input.setAttribute( 'value', target_val );
				} else if ( track.classList.contains( 'date-spinner__track_month' ) ) {
					month_input.setAttribute( 'value', target_val );
				} else if ( track.classList.contains( 'date-spinner__track_year' ) ) {
					year_input.setAttribute( 'value', target_val );
				}
			}

		}
	);
}

