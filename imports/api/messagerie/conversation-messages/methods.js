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
    }
  }).validator(),
  run(conversationMessage){
    ConversationMessages.insert(conversationMessage);
  }
});
