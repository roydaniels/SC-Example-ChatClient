var express = require('express'),
    app     = express.createServer();

app.get('/', function (req, res) {
  res.send('welcome to node.js via express!');
});

app.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');

//*****************************************************************
// Start socket.io interface
//*****************************************************************
var io      = require('socket.io'),
    socket  = io.listen(app),
    buffer  = [];
    
socket.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });

  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });

  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  });
});