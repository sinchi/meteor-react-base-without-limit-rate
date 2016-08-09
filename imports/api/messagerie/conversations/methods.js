import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Conversations } from './conversations.js';
import { ConversationMessages } from '../conversation-messages/conversation-messages';

export const insertConversation = new ValidatedMethod({
  name: "conversations.insert",
  validate: new SimpleSchema({
    originatingToId: { type: String },
    originatingToName: { type: String },
    body: { type: String },
    order:{ type: Number }
  }).validator(),
  run({ originatingToId, originatingToName, body, order }){
    let currentUser = Meteor.users.findOne({ _id: this.userId })
    let conversation = {
      originatingFromId: this.userId,
      originatingFromName: currentUser.profile.name.first + " " + currentUser.profile.name.last,
      originatingToId: originatingToId,
      originatingToName: originatingToName
    };
    let conversationId = Conversations.insert(conversation);
    let message = {
      conversationId: conversationId,
      from:{
        userId: this.userId
      },
      to:{
        userId: originatingToId,
        read: false
      },
      body: body,
      order: order
    };
    ConversationMessages.insert(message);
  }
});

export const removeConversation = new ValidatedMethod({
  name: "conversations.remove",
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }){
    Conversations.remove({ _id: _id });
  }
});
