import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Cities } from  '../../api/cities/cities.js';
import { Sequence } from "../../api/sequences/sequence.js";

import { Conversations } from "../../api/messagerie/conversations/conversations.js";
import { ConversationMessages } from "../../api/messagerie/conversation-messages/conversation-messages.js";
import { updateStatus } from "../../api/users/methods.js";

const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});

Meteor.startup(() => {

//  console.log('------------------------------------------------');

   if(Meteor.isClient){
     $(window).bind('beforeunload', function() {
         closingWindow();

         // have to return null, unless you want a chrome popup alert
      //   return null;

         // have to return null, unless you want a chrome popup alert
         //return 'Are you sure you want to leave your Vonvo?';
     });

     closingWindow = function(){
       console.log('closingWindow');
       updateStatus.call({ userId: Meteor.userId(), status: false });
     }
   }


  if(Conversations.find().count() === 0 && ConversationMessages.find().count() === 0){
    // ayoub sinchi = nzTPZu435fXmHGhwE
    // moaad = bWPdq4r6LuJdqLuaK
    // amine 2iHpu37fWghbtG5dH
    let conversationId =  Conversations.insert({originatingFromId: "nzTPZu435fXmHGhwE", originatingFromName:"ayoub sinchi", originatingToId:"bWPdq4r6LuJdqLuaK", originatingToName:"moaad"});
    let conversationId2 =  Conversations.insert({originatingFromId: "nzTPZu435fXmHGhwE", originatingFromName:"ayoub sinchi", originatingToId:"2iHpu37fWghbtG5dH", originatingToName:"amine"});
    let message = {
      conversationId: conversationId,
      from:{
        userId: "nzTPZu435fXmHGhwE"
      },
      to:{
        userId: "bWPdq4r6LuJdqLuaK",
        read: false
      },
      body: "salam mo3ad ha 7na jayin hamdollah",
      publication: new Date(),
      originatingFromIdDeleted: false,
      originatingToIdDeleted: false,
      order: 1
    };
    let message2 = {
      conversationId: conversationId,
      from:{
        userId: "nzTPZu435fXmHGhwE"
      },
      to:{
        userId: "bWPdq4r6LuJdqLuaK",
        read: false
      },
      body: "salam mo3ad ha 2eme",
      publication: new Date(),
      originatingFromIdDeleted: false,
      originatingToIdDeleted: false,
      order: 2
    };
    let message3 = {
      conversationId: conversationId2,
      from:{
        userId: "nzTPZu435fXmHGhwE"
      },
      to:{
        userId: "2iHpu37fWghbtG5dH",
        read: false
      },
      body: "salam amine  ha 1er",
      publication: new Date(),
      originatingFromIdDeleted: false,
      originatingToIdDeleted: false,
      order: 3
    };
    ConversationMessages.insert(message);
    ConversationMessages.insert(message2);
    ConversationMessages.insert(message3);

  }

  if(Sequence.find().count() === 0){
    Sequence.insert({ _id: "messages", seq:1 });
  }
  if(Cities.find().count() === 0){
	Cities.insert({
  	name: 'Casablanca'
  });
  Cities.insert({
  	name: 'Tanger'
  });
  Cities.insert({
  	name: 'Agadir'
  });

  Cities.insert({
  	name: 'Fes'
  });

  Cities.insert({
  	name: 'Marrakech'
  });

  Cities.insert({
  	name: 'El jadida'
  });

  Cities.insert({
  	name: 'Rabat'
  });
}

});
