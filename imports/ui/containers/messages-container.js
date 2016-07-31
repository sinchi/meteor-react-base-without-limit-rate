import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../api/messages/messages.js';
import { MessagesComponent } from "../components/messages-component.js";
import { Loading } from '../components/loading.js';
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


		const messagesData = _.map(msgs, (msg) => {
			msg.sender = Meteor.users.findOne(msg.sender, { fields:{ profile: 1 } });
			msg.receiver = Meteor.users.findOne(msg.receiver, { fields:{ profile: 1 } });
			return msg;
		});

		const groupBySenders = _.groupBy(messagesData, (message) => {
			if(message.sender._id !== Meteor.userId())
				return message.sender._id;
		});

		let details = null;
		if(params.userId){
			 details =  Messages.find({
				$or:[
					{
						sender: params.userId,
						receiver: Meteor.userId()
					},
					{
						sender: Meteor.userId(),
						receiver: params.userId
					}
			]}, {sort:{ publication: 1 } }).fetch();
		}

			const messagesDetail = _.map(details, (msg) => {
				let user = null;
				if(msg.sender === Meteor.userId())
					user = Meteor.user();
				else if(msg.receiver === Meteor.userId())
					user = Meteor.users.findOne({ _id: msg.sender }, { fields: { profile: 1 } });
				return {
					_id: msg._id,
					position: msg.sender !== Meteor.userId() ? 'left' : 'right',
					image:{
						src: "http://bootdey.com/img/Content/user_1.jpg",
						alt: "User Avatar",
					},
					username: user.profile.name.first + ' ' + user.profile.name.last,
					date: "12 min ago",
					content: msg.content
				}
			});


		onData(null, {friends, messagesDetail });
	}
};

export default composeWithTracker(composer, Loading)(MessagesComponent);
