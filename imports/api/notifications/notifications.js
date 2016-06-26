import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';

export const Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Notifications.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

Notifications.Schema = new SimpleSchema({
	annonce_id: { 
		type: String , 
		label:'Notification - the annonce id' 
	} ,				
	commentId: { 
		type: String , 
		label: 'Notification - the comment id'
	},
	owner: { 
		type: String , 
		label: 'Notification - the id of the owner of notification'
	},
	read: { 
		type: Boolean , 
		label: 'Notification - read it ?'
	},
	publication: {
	 	type: Date, 
	 	label: 'Notification - the date of the publication' 
	}
});

Notifications.attachSchema(Notifications.Schema);

Factory.define('notification', Notifications, {
	annonce_id: () => faker.hacker.phrase(),
	commentId: () => faker.hacker.phrase(),
	owner: () => faker.hacker.phrase(),
	read: () => false,
	publication: () => new Date()
});