import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const NotificationMessage = new Mongo.Collection('notification-message');

NotificationMessage.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

NotificationMessage.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});


NotificationMessage.Schema = new SimpleSchema({
	messageId: { 
		type: String ,
		label: 'The id of the message'
	},
	receiver: {
		type: String,
		label: 'The id of the receiver '
	}	
});

NotificationMessage.attachSchema(NotificationMessage.Schema);

Factory.define('notification-message', NotificationMessage, {
	messageId: () => faker.hacker.phrase(),
	receiver: () => faker.hacker.phrase()
});