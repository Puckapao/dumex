var nav_trigger = document.querySelector( '.menu-trigger' );

console.log(nav_trigger);

nav_trigger.addEventListener(
	'click',
	(e) => {
		e.preventDefault();
		document.querySelector( 'body' ).classList.toggle( 'showmenu' );
	}
);