import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ConversationMessages } from './conversation-messages.js';


export const insertConversationMessages = new ValidatedMethod({
  name: "conversationMessages.insert",
  validate: new SimpleSchema({
    conversationId: {
      type: String,
      label: "The id of the conversation that comporte all ConversationMessages"
    },

    from:{
      type: Object,
      label: "from who ?"
    },
    "from.userId":{
      type: String,
      label: "the id of the sender"
    },
    to:{
      type:Object,
      label: "The receiverObject of the message"
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
    publication: {
      type: Date,
      label: "the date of the message"
    },
    order:{
      type:Number
    }
  }).validator(),
  run(conversationMessage){
    ConversationMessages.insert(conversationMessage);
  }
});

export const readThemAll = new ValidatedMethod({
  name: "conversationMessage.readThemAll",
  validate: new SimpleSchema({
    conversationId: { type: String },
    read: { type: Boolean }
  }).validator(),
  run({ conversationId, read }){
    ConversationMessages.update({ conversationId: conversationId, "to.userId":this.userId }, { $set:{ "to.read": read } }, {multi: true});
  }
});

export const setNotificationSoundOff = new ValidatedMethod({
  name: "conversationMessages.setNotificationSoundOff",
  validate: new SimpleSchema({
    conversationMessagesId: { type: String }
  }).validator(),
  run({ conversationMessagesId }){
    //console.log("id from validated-method ", conversationMessagesId);
    ConversationMessages.update({ _id: conversationMessagesId }, { $set: { notificationSound: false } });
  }
});
