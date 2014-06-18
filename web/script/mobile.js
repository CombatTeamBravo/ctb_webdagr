// if webapp mode detected, stop rubberband scroll
if (window.navigator.standalone == true) {
	$(document).bind(
		'touchmove',
		function(e) {
			e.preventDefault();
		}
	);
}