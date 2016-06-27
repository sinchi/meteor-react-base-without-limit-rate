import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { NotificationAnnonce } from './notification-annonce.js';

export const insertNotificationNewAnnonce = new ValidatedMethod({
	name: 'notificationAnnonce.insert',
	validate: new SimpleSchema({
		userId: {
		type: String,
		label: 'The id of the notifed'
	},
		annonceId: {
			type: String,
			label: 'The id of the annonce'
		},
		publication: {
			type: Date,
			defaultValue: new Date(),
			label: 'The date of the notification'
		},
		read:{
			type: Boolean,
			label: 'Read it ?'
		}
	}).validator(),
	run(notificationAnnonce){
		NotificationAnnonce.insert(notificationAnnonce);
	}
});


export const removeNotificationNewAnnonce = new ValidatedMethod({
	name: 'notificationAnnonce.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		userId: { type: String }
	}).validator(),
	run({ _id, userId }){
		const notificationAnnonce = NotificationAnnonce.findOne(_id);
		if(notificationAnnonce.userId === userId)
			NotificationAnnonce.remove(_id);
	}
});