import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { NotificationAnnonce } from './notification-annonce.js';
import { Meteor } from 'meteor/meteor';

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
		category:{
			type: String,
			label: 'The category of the annonce'
		},
		read:{
			type: Boolean,
			label: 'Read it ?'
		}
	}).validator(),
	run(notificationAnnonce){
		console.log(notificationAnnonce);
		NotificationAnnonce.insert(notificationAnnonce);
	}
});


export const updateToReadNotificationNewAnnonce = new ValidatedMethod({
	name: 'notificationAnnonce.remove',
	validate: new SimpleSchema({
		categoryId: { type: String }
	}).validator(),
	run({ categoryId }){
		NotificationAnnonce.update({ category: categoryId, userId: this.userId },{ $set: { read: true } } ,{multi:true});
	}
});
