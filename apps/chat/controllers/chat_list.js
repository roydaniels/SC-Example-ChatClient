// ==========================================================================
// Project:   Chat.chatListController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Chat.chatListController = SC.ArrayController.create(
/** @scope Chat.chatListController.prototype */ {

  content: [],
  currentMsg: null,

  createMessage: function(data) {
    var usr, msg;
    
    if('announcement' in data) {
      usr = '';
      msg = this._esc(data.announcement);
    } else if('message' in data) {
      usr = this._esc(data.message[0]) + ':';
      msg = this._esc(data.message[1]);
    }
    
    var obj = Chat.ChatModel.create({ user: usr, message: msg });
    this.addObject(obj);
  },
  
  _esc: function(msg){
    return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

}) ;
