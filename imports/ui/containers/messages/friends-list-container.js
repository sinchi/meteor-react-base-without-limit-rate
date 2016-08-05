import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { FriendsListComponent } from "../../components/messages/friends-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('messages');
  	if(subscriptions.ready()) {
  		const msgs = Messages.find({}, {sort:{ publication: -1 }}).fetch();
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
  			]}, { limit: 1, sort:{ publication: -1 } }).fetch();
  			msg[0].sender = Meteor.users.findOne({_id: msg[0].sender}, { fields: { profile: 1 } });
  			msg[0].receiver = Meteor.users.findOne({_id: msg[0].receiver}, { fields: { profile: 1 } });
  			msg[0].count = Messages.find({sender: userId, read: false}).count();
  			return msg;
  		});

      onData(null, {friends});
    }
};
export default composeWithTracker(composer, Loading)(FriendsListComponent);
