import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { ChatMessageListComponent } from "../../components/messages/chat-message-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { ConversationMessages } from '../../../api/messagerie/conversation-messages/conversation-messages.js';
const composer = (params, onData) => {
	// search the detail of the conversation by the route param conversationId and sort the result by order DESC
	let conversationMessages = ConversationMessages.find({conversationId: params.conversationId}, { sort:{ order: 1 } }).fetch();

				// construct the view of the message to render it
				const messagesDetail = _.map(conversationMessages, (msg) => {
					let user = null;
					if(msg.from.userId === Meteor.userId())
						user = Meteor.user();
					else if(msg.to.userId === Meteor.userId())
						user = Meteor.users.findOne({ _id: msg.from.userId }, { fields: { profile: 1 } });
					return {
						_id: msg._id,
						position: msg.from.userId !== Meteor.userId() ? 'left' : 'right',
						image:{
							src: user.profile.avatar,
							alt: "User Avatar",
						},
						username: user.profile.name.first + ' ' + user.profile.name.last,
						date: msg.publication,
						content: msg.body,
						from: msg.from.userId,
						to: msg.to.userId
					}
				});

			onData(null, {messagesDetail });

};
export default composeWithTracker(composer, Loading)(ChatMessageListComponent);
