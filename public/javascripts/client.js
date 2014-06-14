$(function() {
	var iosocket = io.connect();

	iosocket.on('message', function(message) {
		$('#inGrid').text(message.x + 'e' + ' ' + message.y + 'n');
		$('#inDir').text('Dir: ' + message.dir);
		$('#inAlt').text('Alt: ' + message.alt);
		$('#inSpd').text('Speed: ' + message.spd);
		$('#inTme').text('Time: ' + message.tme);
	});
});