sc_require('controllers/chat_list');

Chat.chatListView = SC.TemplateCollectionView.extend({
  contentBinding: 'Chat.chatListController',
  
  arrayContentDidChange: function() {
    sc_super();
    
    // Scroll to the bottom of the chat box when using iScroll
    if(SC.platform.touch && Chat.chatBoxScroller) {
        Chat.chatBoxScroller.refresh();
    		Chat.chatBoxScroller.scrollToElement('li:last-child', 0);
    }
  },
  
  invalidateFrame: function() {
    sc_super();
    
    // Scroll to the bottom of the chat box
    if(!SC.platform.touch && SC.$('#chatBox')[0]) SC.$('#chatBox').scrollTop(SC.$('#chatBox')[0].scrollHeight);
  }
  
});