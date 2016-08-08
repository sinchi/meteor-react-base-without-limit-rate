import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Conversations = new Mongo.Collection('conversations');

Conversations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Conversations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Conversations.schema = new SimpleSchema({
  originatingFromId: {
    type: String,
    label: "The id of the sender's message"
  },

  originatingFromName:{
    type:String,
    label: "The name of the sender's message"
  },

  originatingToId: {
    type: String,
    label: "the id of the receiver's message"
  },

  originatingToName:{
    type: String,
    label: "the name of the receiver's message"
  }

});

Conversations.attachSchema(Conversations.schema);
