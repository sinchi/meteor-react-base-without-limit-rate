import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Messages } from './messages.js';
import { Sequence } from '../sequences/sequence.js';
import { rateLimit } from '../../modules/rate-limit.js';
import { aggregate } from 'meteor/meteorhacks:aggregate';

export const  insertMessage = new ValidatedMethod({
	name: 'messages.insert',
	validate: new SimpleSchema({
		sender: {
			type: String,
			label: 'the sender of the message'
		},
		receiver:{
			type: String,
			label: 'the receiver of the message'
		},
		publication:{
			type: Date,
			label:"The date of the message"
		},
		read: {
			type: Boolean,
			label: 'the status of the message'
		},
		content:{
			type: String,
			label: "the content of the message"
		},
		order:{
			type:Number,
			label: "the order of the message"
		}
	}).validator(),
	run( message ){
		Messages.insert(message);
	}
});


export const messageReceived = new ValidatedMethod({
	name: "message.update",
	validate: new SimpleSchema({
		sender: {type: String}
	}).validator(),
	run({ sender }){
		Messages.update({ "sender": sender, "receiver": Meteor.userId() }, { $set:{ "read": true } } , { multi: true });
	}
});

export const receivedMessagesBySender = new ValidatedMethod({
	name: "messages.getReceivedMessagesBySender",
	validate: null,
	run(){
		var result = Messages.aggregate(  [
		//	{$match:{ receiver:this.userId }} ,
			{ $group: { _id:"$sender", count:{$sum:1} } } ,
	//		{$sort:{"count": -1}}
		]);
		return result;

	}
});
//
// export const sendedMessagesByReceiver = new ValidatedMethod({
// 	name: "messages.getSendedMessagesByReceiver",
// 	validate: null,
// 	run(){
// 		return Messages.aggregate(  [ {$match:{ sender:this.userId }} ,{ $group: { _id:"$receiver", count:{$sum:1} } } , {$sort:{"count": -1}}])
// 	}
// });

// les messages que j'ai recu regroupé par l'envoyeur
//db.getCollection('messages').aggregate(  [ {$match:{ receiver:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$sender", count:{$sum:1} } } , {$sort:{"count": -1}}])

// Meteor.publish('receivedMessagesBySender', function(){
// 	return Messages.aggregate(  [ {$match:{ receiver:this.userId }} ,{ $group: { _id:"$sender", count:{$sum:1} } } , {$sort:{"count": -1}}]);
// });

// les mesages que j'ai envoyé regroupé par le récepteur
//db.getCollection('messages').aggregate(  [ {$match:{ sender:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$receiver", count:{$sum:1} } } , {$sort:{"count": -1}}])

// 	Meteor.publish('sendedMessagesByReceiver', function(){
// 	return Messages.aggregate(  [ {$match:{ sender:this.userId }} ,{ $group: { _id:"$receiver", count:{$sum:1} } } , {$sort:{"count": -1}}])
// });

// rateLimit({
//   methods: [
//     messageReceived,
//     insertMessage,
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
