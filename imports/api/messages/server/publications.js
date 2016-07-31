import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.publishComposite('messages', function(){
	return {
    find: function(){
      return Messages.find({
        $or:[
          { sender: this.userId },
          { receiver: this.userId }
        ]
      },
			{sort:{ publication: -1 } });
    },
    children:[
        {
	          find: function(message){
							if(message.sender === this.userId)
	            	return Meteor.users.find({ _id: message.receiver });

							if(message.receiver === this.userId)
								return Meteor.users.find({ _id: message.sender });
	        }
				},

    ]
  }
});
