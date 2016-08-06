import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { FriendsListComponent } from "../../components/messages/friends-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { receivedMessagesBySender } from '../../../api/messages/methods';

// les messages que j'ai recu regroupé par l'envoyeur
//db.getCollection('messages').aggregate(  [ {$match:{ receiver:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$sender", count:{$sum:1} } } , {$sort:{"count": -1}}])

// les mesages que j'ai envoyé regroupé par le récepteur
//db.getCollection('messages').aggregate(  [ {$match:{ sender:"bWPdq4r6LuJdqLuaK" }} ,{ $group: { _id:"$receiver", count:{$sum:1} } } , {$sort:{"count": -1}}])

const composer = (params, onData) => {
	// const subSendedMessages  = Meteor.subscribe('sendedMessagesByReceiver');
	// //const subReceivedMessages = Meteor.subscribe('receivedMessagesBySender');
	// if( subSendedMessages.ready()){
	// 	console.log(Messages.find().fetch());
	// }
	let result = receivedMessagesBySender.call();
	console.log(result);
	const subscriptions = Meteor.subscribe('messages', 23);
  	if(subscriptions.ready()) {
  		const msgs = Messages.find({}, {sort:{ order: -1 }}).fetch();
  		const conversations = [];
  		_.each(msgs, (msg) => {
  			if(msg.sender !== Meteor.userId() && !_.contains(conversations, msg.sender))
  				conversations.push(msg.sender);
  			if(msg.receiver !== Meteor.userId() && !_.contains(conversations, msg.receiver))
  				conversations.push(msg.receiver);
  		});
  	let friends =	_.map(conversations, (userId) => {
  			let msg =  Messages.find({
  				$or:[
  					{
  						sender: userId,
  						receiver: Meteor.userId()
  					},
  					{
  						sender: Meteor.userId(),
  						receiver: userId
  					}
  			]}, { limit: 1, sort:{ order: -1 } }).fetch();
  			msg[0].sender = Meteor.users.findOne({_id: msg[0].sender}, { fields: { profile: 1 } });
  			msg[0].receiver = Meteor.users.findOne({_id: msg[0].receiver}, { fields: { profile: 1 } });
  			msg[0].count = Messages.find({sender: userId, read: false}).count();
  			return msg;
  		});

      onData(null, {friends});
    }
};
export default composeWithTracker(composer, Loading)(FriendsListComponent);
