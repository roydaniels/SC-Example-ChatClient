// ==========================================================================
// Project:   Chat
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Chat = SC.Application.create(
  /** @scope Chat.prototype */ {

  NAMESPACE: 'Chat',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  socket: new io.Socket('localhost', {
    port: 8124, 
  	//rememberTransport: false
  }),
  
  // Sends a message to the server via sockets
	sendMessageToServer: function (message) {
	  this.socket.send(message);
	}
  
});

Chat.ChatModel = SC.Object.extend({
  user: null,
  message: null
});

Chat.mixin( /** @scope Chat */ { 
  statechart: SC.Statechart.create({

    // Set tracing on to debug statecharts if you like
    trace: NO,
  
    initialState: 'appStart',
    
    appStart: SC.State.extend({

      enterState: function() { 
        Chat.socket.connect();
        Chat.getPath('mainPage.mainPane').append(); 
      },
      
      sendMessage: function(evt, data) {
        var msg = Chat.chatListController.get('currentMsg');
        if(msg) {
          Chat.sendMessageToServer(msg);
          Chat.chatListController.createMessage({ message: ['you', msg] });
          Chat.chatListController.set('currentMsg', '');
        }
      },
      
      exitState: function() { 
      }
    }) // end statechart.appStart
  }) // end Chat.statechart
});
