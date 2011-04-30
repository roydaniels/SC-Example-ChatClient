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
  
  chatBoxScroller: null,
  
  onAppLoaded: function () {
    if(SC.platform.touch) {
  	  Chat.invokeLater(Chat._setupChatScroller, 100);
    } else { 
      // Comment out if you do not want to use iScroll on the desktop
      Chat.invokeLater(Chat._setupChatScroller, 100);
    }
  },
  
  // Sends a message to the server via sockets
	sendMessageToServer: function (message) {
	  this.socket.send(message);
	},
	
  socket: new io.Socket('localhost', {
    port: 8124, 
  	rememberTransport: false
  }),
  
  _setupChatScroller: function() {
    Chat.chatBoxScroller = new iScroll('chatBox', { hideScrollbar: true, snap: 'li' }); // Set hideScrollbar to false to always show the scrollbar
		if(Chat.chatBoxScroller.vScrollbar) Chat.chatBoxScroller.scrollToElement('li:last-child', 0);
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
        SC.Event.add(window, "load", Chat.onAppLoaded) ;
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
