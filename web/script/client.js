

// formatting date & time
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

function timeLeadZero(timeInt) {
    if(timeInt < 10) {
        var addZero = "0" + String(timeInt);
        return addZero;
    }
    else {
        var timeString = String(timeInt);
        return timeString;
    }
}

// Returns coordinates in a standard style, no matter the source map gridref.
function createMapGridPosition(a3Pos) {
    
    // todo
    return a3Pos;
    
}

// attempt at formatting grid...
function formatGrid(gridref) {
    var gridFormat = Math.round(gridref);
    if(gridFormat === 0) {
        var gridFormat = "00000";
    }
    else if(gridFormat < 10) {
        var gridFormat = "0000" + gridFormat.toString();
    }
    else if(gridFormat >= 10 && gridFormat < 100) {
        var gridFormat = "000" + gridFormat.toString();
    }
    else if(gridFormat >= 100 && gridFormat < 1000) {
        var gridFormat = "00" + gridFormat.toString();
    }
    else if(gridFormat >= 1000 && gridFormat < 10000) {
        var gridFormat = "0" + gridFormat.toString();
    }
    else var gridFormat = gridFormat.toString();

    return gridFormat;
}

// Document loaded - let's go!
$(function() {
	var iosocket = io.connect();


    // Whenever we get a Web Socket message...
    iosocket.on('message', function(message) {
		
		// hide containers at start, then show after receiving message
		$('#topBar').show();
		$('#container').show();
		
		// incoming status bar
		$('#inMode').text('CONT');
		$('#inBatt').text('100%');
		$('#inSync').text('<1min');
		
		$('#inTme').text(message.tme[0] + ' ' + monthName[message.tme[1] - 1] + ' ' + message.tme[2] + ' ' + timeLeadZero(message.tme[3]) + ':' + timeLeadZero(message.tme[4]));
		
		// incoming mgrs
		$('#inGrid').text(message.grd);
		
		// incoming main info block
		$('#dirTitle').text('DIR:');
			$('#inDir').text(message.dir.toFixed() + '\xB0');
		$('#altTitle').text('ELE:');
			$('#inAlt').text(message.alt.toFixed() + 'm MSL');
		$('#spdTitle').text('SPD:');
			$('#inSpd').text(message.spd.toFixed() + ' km/h');
			
		// incoming waypoint block
		$('#wpNameTitle').text('WP000' + ':');
			$('#inWpName').text('MARK-1');
		$('#wpGridTitle').text('POS:');
			$('#inWpGrid').text('03626e 04238n');
		$('#wpDirTitle').text('DIR:');
			$('#inWpDir').text('277' + '\xB0' + "34'");
		$('#wpDistTitle').text('DIST:');
			$('#inWpDist').text('1023' + 'm');
			
	});
});
