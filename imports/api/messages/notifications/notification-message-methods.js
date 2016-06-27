import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { NotificationMessage } from './notification-message.js';

export const insertNotificationMessage = new ValidatedMethod({
	name: 'notificationMessage.insert',
	validate: new SimpleSchema({			
		messageId: { 
			type: String ,
			label: 'The id of the message'
		},
		receiver: {
			type: String,
			label: 'The id of the receiver '
		}
	}).validator(),
	run(notificationMessage){
		NotificationMessage.insert(notificationMessage);
	}
});


export const removeNotificationMessage = new ValidatedMethod({
	name: 'notificationMessage.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String }
	}).validator(),
	run({ _id , owner}){
		const notificationMessage = NotificationMessage.findOne(_id);
		if(notificationMessage && notificationMessage.receiver === owner)
			NotificationMessage.remove(_id);
		else
			throw new Meteor.Error(403, 'You don\'t have the permission to remove this notificationMessage');
	}
});