import { composeWithTracker } from 'react-komposer';
import { Messages } from '../../../api/messages/messages.js';
import { FriendsListComponent } from "../../components/messages/friends-list-component.js";
import { Loading } from '../../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { CountReceivedMessagesByUser } from '../../../startup/client/count-received-messages-by-user';
import { CountSendedMessagesByUser } from '../../../startup/client/count-sended-messages-by-user';
import { Conversations } from '../../../api/messagerie/conversations/conversations.js';
import { ConversationMessages } from '../../../api/messagerie/conversation-messages/conversation-messages.js';

const composer = (params, onData) => {
	const subNewFriends = Meteor.subscribe('conversations.friends');
	if(subNewFriends.ready()){
		let conversations = Conversations.find().fetch();
		let friends = _.map(conversations, (conversation) => {
			return ConversationMessages.findOne({conversationId: conversation._id}, {sort: { order: -1 }, limit:1});
		});	
		  onData(null, {friends});
	}

};
export default composeWithTracker(composer, Loading)(FriendsListComponent);
