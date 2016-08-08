import { Meteor } from 'meteor/meteor';
import { Conversations } from '../conversations';
import { ConversationMessages } from '../../conversation-messages/conversation-messages';

Meteor.publishComposite('conversations.friends', function(){
  return {
    find: function(){
      return Conversations.find({ $or:[{ originatingFromId: this.userId }, { originatingToId: this.userId }] });
    },
    children:[
      {
        find: function(conversation){
          return ConversationMessages.find({ conversationId: conversation._id }, {sort:{ order: -1 }, limit:1} );
        },
        children:[
          {
            find: function(message, conversation){
              if(message.from.userId === this.userId)
                return Meteor.users.find({ _id: message.to.userId }, { fields: { profile : 1 } });

              return Meteor.users.find({ _id: message.from.userId }, { fields : { profile: 1 } });
            }
          }
        ]
      }
    ]
  }
});
