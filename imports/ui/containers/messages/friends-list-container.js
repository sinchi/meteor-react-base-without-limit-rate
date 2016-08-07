import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { FriendsListComponent } from "../../components/messages/friends-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { CountReceivedMessagesByUser } from '../../../startup/client/count-received-messages-by-user';
import { CountSendedMessagesByUser } from '../../../startup/client/count-sended-messages-by-user';

_mergeSendedAndReceivedData = (sended, received, all) => {
	if(sended.length > received.length){
		_.each(sended, (s) => {
			all.push(s)
		});
		let exist = false;
		for(let i=0; i<received.length; i++){
			for(let j=0; j<all.length; j++){
				if(all[j].user._id === received[i].user._id){
					exist = true;
				}
			}
			if(!exist){
				all.push(received[i])
			}
		}
	}else
	 if(received.length > sended.length){
		_.each(received, (r) => {
			all.push(r)
		});
		let exist = false;
		for(let i=0; i<sended.length; i++){
			for(let j=0; j<all.length; j++){
				if(all[j].user._id === sended[i].user._id){
					exist = true;
				}
			}
			if(!exist){
				all.push(sended[i])
			}
		}
	}
	return all;
}



const composer = (params, onData) => {
	const sended = Meteor.subscribe('countSendedMessagesByUser');
	const received = Meteor.subscribe('countReceivedMessagesByUser');
	if(sended.ready() && received.ready()){
		const sended = CountSendedMessagesByUser.find().fetch();
		const received = CountReceivedMessagesByUser.find().fetch();
		let all = [];
		all = _mergeSendedAndReceivedData(sended, received, all);
		console.log(all);

	}
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
