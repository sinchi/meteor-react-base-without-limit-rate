import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Conversations } from './conversations.js';

export const insertConversation = new ValidatedMethod({
  name: "conversations.insert",
  validate: new SimpleSchema({
    originatingFromId: { type: String },
    originatingFromName: { type: String },
    originatingToId: { type: String },
    originatingToName: { type: String }
  }).validator(),
  run(conversation){
    Conversations.insert(conversation);
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
