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
			msg[0].count = Messages.find({sender: userId, read: false}).count();
			return msg;
		});

		console.log(users);

		const messagesData = _.map(msgs, (msg) => {
			msg.sender = Meteor.users.findOne(msg.sender, { fields:{ profile: 1 } });
			msg.receiver = Meteor.users.findOne(msg.receiver, { fields:{ profile: 1 } });
			return msg;
		});

		const groupBySenders = _.groupBy(messagesData, (message) => {
			if(message.sender._id !== Meteor.userId())
				return message.sender._id;
		});

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
