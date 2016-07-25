import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';


export const NotificationAnnonce = new Mongo.Collection('notification-annonce');

NotificationAnnonce.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

NotificationAnnonce.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

NotificationAnnonce.Schema = new SimpleSchema({

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
		label: "The Category of annonce"
	},
	read:{
		type: Boolean,
		label: 'Read it ?'
	}
});

NotificationAnnonce.attachSchema(NotificationAnnonce.Schema);

Factory.define('notification-annonce', NotificationAnnonce, {
	userId: () => faker.hacker.phrase(),
	annonceId: () => faker.hacker.phrase(),
	publication: () => new Date(),
	read: () => false
});
