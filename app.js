
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,	socketio = require('socket.io')
  , dgram = require('dgram')
  ,	udpServer = dgram.createSocket('udp4')
  , udpPort = 32114;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(8080, function(){
  console.log("HTTP server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/**********************
Axyl's code starts here
**********************/

// Storing the created IO socket... (as ioInstance) so we can send it messages in the UDP's message received event
var ioInstance = socketio.listen(app).on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});

// code triggered when our UDP Server starts listening for updates...
udpServer.on('listening', function() {
	var address= udpServer.address();
	console.log('UDP server listening on port ' + address.port);
});

// Turn on the UDP server
udpServer.bind(udpPort);

//code triggered whenever we receive a message from our UDP server.
udpServer.on('message', function(message, remoteSender) {
	var posData = JSON.parse(message);
	console.log('Client at XPos: '+ posData.x+ ', YPos: '+ posData.y);
	// So we've received an update, now broadcast that to our web page via a web socket...
	ioInstance.emit('message', posData);
});  // End of onMessage event.