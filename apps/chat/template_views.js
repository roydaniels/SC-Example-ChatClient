sc_require('controllers/chat_list');

Chat.chatListView = SC.TemplateCollectionView.extend({
  contentBinding: 'Chat.chatListController'
});