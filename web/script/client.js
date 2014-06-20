

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

// attempt at formatting grid... needs lots of work
function gridSplit(gridref) {
    var getSplit = gridref.toString();
    var e = getSplit.slice(0, gridref.length / 2);
    var n = getSplit.slice(gridref.length / 2);
  
	return [parseInt(e, 10), parseInt(n, 10)];
}

function formatGrid(gridref) {
    var gotSplit = gridSplit(gridref);
    var easting = Math.round(gotSplit[0]);
    var northing = Math.round(gotSplit[1]);
    
    switch(easting) {
        // tried catching 00000 grids here, doesn't work. tried isNaN(); might not have used it properly
        case easting === NaN:
            var eastFormat = "00000";
            break;
        case easting < 10: 
            var eastFormat = "0000" + easting.toString();
            break;
        case easting >= 10 && easting < 100:
            var eastFormat = "000" +  easting.toString();
            break;
        case easting >= 100 && easting < 1000:
            var eastFormat = "00" + easting.toString();
            break;
        case easting >= 1000 && easting < 10000:
            var eastFormat = "0" + easting.toString();
            break;
        default:
            var eastFormat = easting.toString();
    }
    
    switch(northing) {
        case northing === NaN:
            var northFormat = "00000";
            break;
        case northing < 10:
            var northFormat = "0000" + northing.toString();
            break;
        case northing >= 10 && northing < 100:
            var northFormat = "000" + northing.toString();
            break;
        case northing >= 100 && northing < 1000:
            var northFormat = "00" + northing.toString();
            break;
        case northing >= 1000 && northing < 10000:
            var northFormat = "0" + northing.toString();
            break;
        default:
            var northFormat = northing.toString();
    }
    
    return [eastFormat, northFormat];
    // after all that, still doesn't add leading zeros as string, fail
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
