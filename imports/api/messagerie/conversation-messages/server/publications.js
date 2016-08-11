import { Meteor } from 'meteor/meteor';
import { ConversationMessages } from '../conversation-messages';

Meteor.publish('conversation-messages', function(conversationId, limit){

  check(conversationId, String);
	check(limit, Number);

		if(!limit)
			limit = 20;

      return ConversationMessages.find(
        {
          conversationId: conversationId
       },
      {
        sort:{ order: -1 },
        limit: limit
      }
    );

});



Meteor.publish('newMessage', function(){
  var subscription = this;

  ConversationMessages.find({"to.userId": this.userId, "to.read": false, notificationSound: true}).observeChanges({
    added: function(id, fields){
      subscription.added('newMessage', id, fields);
      subscription.ready();
    }
  });
});
