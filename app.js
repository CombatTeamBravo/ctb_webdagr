
// our web server's IP and port
var httpPort= 8080;
var httpIP= '0.0.0.0';

// Are we running inside cloud 9?
var isCloud9= false;
if (process.argv[2]=== 'c9') {
    isCloud9= true;
    // Use Cloud9's Port and IP for hosting the express web server...
    httpPort= process.env.PORT;
    httpIP= process.env.IP;
};
    
/**
 * Module dependencies.
 */

var express = require('express')
  , http= require('http')
  , path= require('path')
  ,	socketio = require('socket.io')
  , dgram = require('dgram')
  ,	udpServer = dgram.createSocket('udp4')
  , udpPort = 32114;        // Port we listen on, for incoming messages from A3.

var app = express();
var server= http.createServer(app);
var io= socketio.listen(server);

// Base web files directory is ./web
app.use(express.static(path.resolve(__dirname, 'web')));


server.listen(httpPort, httpIP, function(){
  console.log("HTTP server listening on port %d", server.address().port);
});

/**********************
Axyl's code starts here
**********************/

var wsockets= [];        // Array of connected web sockets.

io.on('connection', function (wsocket) {
    console.log('Web Socket connected.');
    // New Web Socket?  Add it to the array list of web sockets.
    wsockets.push(wsocket);
    
    // When they've disconnecteD?  remove them...
    wsocket.on('disconnect', function() {
        wsockets.splice(wsockets.indexOf(wsocket), 1);
        console.log('Web Socket disconnected.');
    });
});

// Call this to broadcast a web socket message to all connected clients.
function broadcastWS(event, data) {
    wsockets.forEach(function (wsocket) {
        wsocket.emit(event, data);
    });
}

// code triggered when our UDP Server starts listening for updates...
udpServer.on('listening', function() {
	var address= udpServer.address();
	console.log('UDP server listening on port ' + address.port);
});

// Turn on the UDP server
if (!isCloud9) {
    udpServer.bind(udpPort);
};

//code triggered whenever we receive a message from our UDP server.
udpServer.on('message', function(message, remoteSender) {
	var posData = JSON.parse(message);
	console.log('Client at XPos: '+ posData.x+ ', YPos: '+ posData.y);
	// So we've received an update, now broadcast that to our web page via a web socket...
	broadcastWS('message', posData);
});  // End of onMessage event.

// If we're running on Cloud9, then we can't receive UDP messages, so just fake it.
function sendFakeUpdate() {
    var fakePosData= {
        x:"0343", 
        y: "3220",
        alt:Math.floor((Math.random() * 20) + 1),
        dir:Math.floor((Math.random() * 360) + 1),
        spd:Math.floor((Math.random()* 30)+ 1),
        tme:'12:00',
        grd:'024577'
    };
	console.log('Sending fake POS Data at XPos: '+ fakePosData.x+ ', YPos: '+ fakePosData.y);
	// So we've received an update, now broadcast that to our web page via a web socket...
	broadcastWS('message', fakePosData);
}

if (isCloud9) {
    // Trigger fake updates every 10 seconds.
    var runIntervalCode= setInterval(sendFakeUpdate, 10000);
    //and an initial broadcast.
    sendFakeUpdate();
}