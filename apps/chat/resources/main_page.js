// ==========================================================================
// Project:   Chat - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

// This page describes the main user interface for your application.  
Chat.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    defaultResponder: 'Chat.statechart',
    
    childViews: 'topToolbar chatView sendChatView'.w(),
    
    topToolbar: SC.ToolbarView.design({
      childViews: 'menuTitle'.w(),
      
      menuTitle: SC.LabelView.design({
        layout: { height: 22, left: 50, right: 50, centerY: 0 },
        classNames: 'title'.w(),
        textAlign: SC.ALIGN_CENTER,
        fontWeight: SC.BOLD_WEIGHT,
        value: "SC Sample Chat Client",
      }),
    }),
    chatView: SC.View.design({
      layout: { centerX: 0, top: 50, width: 800, height: 300, border: 1 },
      classNames: 'chatWrapper chatBorder'.w(),
      childViews: 'messages'.w(),
      
      messages: SC.TemplateView.design({
        layerId: 'chatBox',
        templateName: 'chat'
      })
    }),
    sendChatView: SC.View.design({
      layout: { centerX: 0, top: 360, width: 800, height: 40, border: 1 },
      classNames: 'chatAdd chatBorder'.w(),
      childViews: 'messageBox sendBtn'.w(),
      
      messageBox: SC.TextFieldView.design({
        layout: { left: 10, right: 70, centerY: 0, height: 28 },
        hint: 'Enter message here...',
        valueBinding: 'Chat.chatListController.currentMsg',
        
        keyUp: function(event) {
          if (event.keyCode === 13) {
            Chat.statechart.sendEvent('sendMessage');
            return YES;
          }
        }
        
      }),
      sendBtn: SC.ButtonView.design({
        layout: { right: 10, centerY: 0, width: 50, height: 24 },
        title: 'Send',
        action: 'sendMessage'
      })
    })
  })

});
