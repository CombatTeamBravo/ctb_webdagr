$(function() {
	var iosocket = io.connect();

	iosocket.on('message', function(message) {
		$('#inMode').text('CONT')
		$('#inSync').text('<1min')
		$('#inGrid').text(message.x + 'e' + ' ' + message.y + 'n');
		$('#inDir').text('DIR: ' + message.dir + '\xB0');
		$('#inAlt').text('ELE: ' + message.alt + 'm MSL');
		$('#inSpd').text('SPEED: ' + message.spd + 'kph');
		$('#inTme').text('TIME: ' + message.tme);
	});
});