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
	let users =	_.map(conversations, (userId) => {
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
			return msg;
		});
		console.log(users);
	// var allMsg =	_.map(conversations, (userId) => {
	// 		return _.filter(msgs, (msg) => {
	// 			return (msg.sender === userId && msg.receiver === Meteor.userId) || (msg.sender === Meteor.userId() && msg.receiver === userId);
	// 		});
	// 	});
	// 	console.log(allMsg);
	//	console.log(msgs);


		const messagesData = _.map(msgs, (msg) => {
			msg.sender = Meteor.users.findOne(msg.sender, { fields:{ profile: 1 } });
			msg.receiver = Meteor.users.findOne(msg.receiver, { fields:{ profile: 1 } });
			return msg;
		});

		const groupBySenders = _.groupBy(messagesData, (message) => {
			if(message.sender._id !== Meteor.userId())
				return message.sender._id;
		});

		// const friends = _.map(messagesData, (message) => {
		// 	return {
		// 		_id: message._id,
		// 		avatar: "http://bootdey.com/img/Content/user_1.jpg",
		// 		name: message.sender.profile.name.first + ' ' + message.sender.profile.name.last,
		// 		lastMessage: message.content,
		// 		date:message.publication,
		// 		count:1,
		// 		active: message.read ? "" : "active bounceInDown"
		// 	}
		// });
	//	console.log(friends);
		// let conversations = [];
	  //  _.each(messages, function(message){
	  // if( message.sender._id !== Meteor.userId() && !_.contains(conversations, message.sender._id))
	  // 		conversations.push({user: message.sender._id, msg: message.content, me: "receiver"})
	  // if( message.receiver._id !== Meteor.userId() && !_.contains(conversations, message.receiver._id))
	  // 		conversations.push({user: message.receiver._id, msg: message.content, me: "sender"})
	  // });
		// console.log(conversations);
			const messagesDetail =  [
					 {
						 _id: "190",
						 position: "left",
						 image:{
							 src: "http://bootdey.com/img/Content/user_1.jpg",
							 alt: "User Avatar",
						 },
						 username: "Ayoub Sinchi",
						 date:"12 mins ago",
						 content: "salut"
					 },
					 {
						 _id:"191",
						 position: "right",
						 image:{
							 src: "http://bootdey.com/img/Content/user_2.jpg",
							 alt: "",
						 },
						 username: "Samah Courtane",
						 date:"12 mins ago",
						 content: "salam"
					 },
					 {
						 _id: "1912",
						 position: "left",
						 image:{
							 src: "http://bootdey.com/img/Content/user_1.jpg",
							 alt: "User Avatar",
						 },
						 username: "Ayoub Sinchi",
						 date:"12 mins ago",
						 content: "cava?."
					 },
					 {
						 _id:"12398",
						 position: "right",
						 image:{
							 src: "http://bootdey.com/img/Content/user_2.jpg",
							 alt: "",
						 },
						 username: "Samah Courtane",
						 date:"12 mins ago",
						 content: "oui cava et toi ?"
					 }
				 ];
			const friends = [
          {
            _id: "112",
            avatar: "http://bootdey.com/img/Content/user_1.jpg",
            name: "Ayoub Sinchi",
            lastMessage: "salut",
            date: "Just now",
            count: 23,
            active: "active bounceInDown"
        },
        {
          _id: "8373",
          avatar: "http://bootdey.com/img/Content/user_3.jpg",
          name: "Rachid Jomjom",
          lastMessage: "hola",
          date: "Just now",
          count: 2,
          active: "active bounceInDown"
        },
        {
          _id: "740",
          avatar: "http://bootdey.com/img/Content/user_5.jpg",
          name: "Amina Farid",
          lastMessage: "Salam",
          date: "Just now"
          //count: 2,
          //active: "active bounceInDown"
        }
      ];



		onData(null, {users, groupBySenders, messagesData , messagesDetail, friends });
	}
};

export default composeWithTracker(composer, Loading)(MessagesComponent);
