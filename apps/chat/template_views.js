sc_require('controllers/chat_list');

Chat.chatListView = SC.TemplateCollectionView.extend({
  contentBinding: 'Chat.chatListController.arrangedObjects',
  
  arrayContentDidChange: function() {
    sc_super();
    
    if(Chat.chatBoxScroller) {
        Chat.chatBoxScroller.refresh();
    		if(Chat.chatBoxScroller.vScrollbar) Chat.chatBoxScroller.scrollToElement('li:last-child', 0);
    } //else if(!SC.platform.touch && SC.$('#chatBox')[0] && !Chat.chatBoxScroller) SC.$('#chatBox').scrollTop(SC.$('#chatBox')[0].scrollHeight);
    // Uncomment the else if statement if you are not using iScroll on the desktop
  }
  
});