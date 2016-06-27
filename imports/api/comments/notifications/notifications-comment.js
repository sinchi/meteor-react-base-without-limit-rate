import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';

export const NotificationComment = new Mongo.Collection('notifications-comment');

NotificationComment.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

NotificationComment.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

NotificationComment.Schema = new SimpleSchema({
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

NotificationComment.attachSchema(NotificationComment.Schema);

Factory.define('notification-comment', NotificationComment, {
	annonce_id: () => faker.hacker.phrase(),
	commentId: () => faker.hacker.phrase(),
	owner: () => faker.hacker.phrase(),
	read: () => false,
	publication: () => new Date()
});