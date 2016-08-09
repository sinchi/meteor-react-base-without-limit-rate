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
