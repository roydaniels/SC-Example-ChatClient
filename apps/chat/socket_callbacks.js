sc_require('controllers/chat_list');

// Add a connect listener
Chat.socket.on('connect', function() {
  //console.log('Client has connected to the server!');
});
// Add a message listener
Chat.socket.on('message', function(data) {
  //console.log('Received a message from the server!',data);
	if ('buffer' in data){
    for (var i=0; i<data.buffer.length; i++) Chat.chatListController.createMessage(data.buffer[i]);
  } else Chat.chatListController.createMessage(data);
});
// Add a disconnect listener
Chat.socket.on('disconnect', function() {
  //console.log('The client has disconnected!');
});
// Add a reconnect listener
Chat.socket.on('reconnect', function(){ 
	//console.log({ message: ['System', 'Reconnected to server']});
});
// Add a reconnecting listener
Chat.socket.on('reconnecting', function(nextRetry){ 
	//console.log({ message: ['System', 'Attempting to re-connect to the server, next attempt in ' + nextRetry + 'ms']});
});
// Add a reconnect_failed listener
Chat.socket.on('reconnect_failed', function() {
	//console.log({ message: ['System', 'Reconnected to server FAILED.']});
});