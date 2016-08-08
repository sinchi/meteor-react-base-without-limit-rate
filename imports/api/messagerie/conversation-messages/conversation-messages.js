import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const ConversationMessages = new Mongo.Collection('conversation-messages');

ConversationMessages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});


ConversationMessages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

ConversationMessages.schema = new SimpleSchema({
  conversationId: {
    type: String,
    label: "The id of the conversation that comporte all ConversationMessages"
  },
  "from.userId":{
    type: String,
    label: "the id of the sender"
  },
  "to.userId":{
    type: String,
    label: "the revericer of the message"
  },
  "to.read":{
    type: Boolean,
    label: "if this message is read by the receiver ?",
    defaultValue: false
  },

  body:{
    type: String,
    label: "the content of the message"
  },

  publication:{
    type: Date,
    label: "The date of the message",
    defaultValue: new Date()
  },

  originatingFromIdDeleted: {
    type: Boolean,
    label: "Is this message is removed by the sender? ",
    defaultValue: false
  },
  originatingToIdDeleted:{
    type: Boolean,
    label: "Is this message is removed by the receiver ?"
  },
  order:{
    type: Number,
    label: "the order of the message "
  }

});

ConversationMessages.attachSchema(ConversationMessages.schema);
