import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { ChatMessageListComponent } from "../../components/messages/chat-message-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('messages');
  	if(subscriptions.ready()) {
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
							src: user.profile.avatar,
							alt: "User Avatar",
						},
						username: user.profile.name.first + ' ' + user.profile.name.last,
						date: "12 min ago",
						content: msg.content
					}
				});

			onData(null, {messagesDetail });
    }
};
export default composeWithTracker(composer, Loading)(ChatMessageListComponent);
