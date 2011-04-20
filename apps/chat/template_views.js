sc_require('controllers/chat_list');

Chat.chatListView = SC.TemplateCollectionView.extend({
  contentBinding: 'Chat.chatListController',
  
  arrayContentDidChange: function() {
    sc_super();
    
    if(Chat.chatBoxScroller) {
        Chat.chatBoxScroller.refresh();
    		Chat.chatBoxScroller.scrollToElement('li:last-child', 0); // Scroll to the bottom of the chat box when using iScroll
    } //else if(!SC.platform.touch && SC.$('#chatBox')[0]) SC.$('#chatBox').scrollTop(SC.$('#chatBox')[0].scrollHeight);
    // Uncomment the else if statement if you are not using iScroll on the desktop
  }
  
});