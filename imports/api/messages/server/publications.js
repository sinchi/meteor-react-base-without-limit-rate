import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';
import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';

Meteor.publishComposite('messages', function(limit){

	check(limit, Number);

		if(!limit)
			limit = 20;
	return {
    find: function(){
      return Messages.find({
        $or:[
          { sender: this.userId },
          { receiver: this.userId }
        ]
      },
			{sort:{ order: -1 }, limit: limit });
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



// les messages que j'ai recu regroupé par l'envoyeur
//db.getCollection('messages').aggregate(  [ {$match:{ receiver:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$sender", count:{$sum:1} } } , {$sort:{"count": -1}}])

Meteor.publish('receivedMessagesBySender', function(){
	ReactiveAggregate(this, Messages, [{
	//	$match:{ receiver:this.userId } ,
		  $group:  {
				 _id:"$sender", count:{$sum:1}
			 },

		//  $sort:{"count": -1}
	 }]);
});

// les mesages que j'ai envoyé regroupé par le récepteur
//db.getCollection('messages').aggregate(  [ {$match:{ sender:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$receiver", count:{$sum:1} } } , {$sort:{"count": -1}}])
Meteor.publish('sendedMessagesByReceiver', function(){
	ReactiveAggregate(this, Messages, [{
	//	$match:{ sender:this.userId } ,
		  $group:  {
				 _id:"$receiver", count:{$sum:1}
			 },

		//  $sort:{"count": -1}
	 }]);
});
