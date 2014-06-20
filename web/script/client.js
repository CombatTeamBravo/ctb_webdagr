// Document loaded - let's go!
$(function() {
	var iosocket = io.connect();

	iosocket.on('message', function(message) {
		
		// hide containers at start, then show after receiving message
		$('#topBar').show();
		$('#container').show();
		
		// incoming status bar
		$('#inMode').text('CONT')
		$('#inBatt').text('100%')
		$('#inSync').text('<1min')
		
		$('#inTme').text('2014 Jun 17 ' + message.tme);
		
		// incoming mgrs
		$('#inGrid').text(message.grd);
		
		// incoming main info block
		$('#dirTitle').text('DIR:');
			$('#inDir').text(message.dir + '\xB0');
		$('#altTitle').text('ELE:')
			$('#inAlt').text(message.alt + 'm MSL');
		$('#spdTitle').text('SPD:');
			$('#inSpd').text(message.spd + ' km/h');
			
		// incoming waypoint block
		$('#wpNameTitle').text('WP000' + ':');
			$('#inWpName').text('MARK-1');
		$('#wpGridTitle').text('POS:');
			$('#inWpGrid').text('03626e 04238n');
		$('#wpDirTitle').text('DIR:')
			$('#inWpDir').text('277' + '\xB0' + "34'");
		$('#wpDistTitle').text('DIST:')
			$('#inWpDist').text('1023' + 'm');
			
	});
});