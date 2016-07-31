import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const Messages = new Mongo.Collection('messages');

Messages.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Messages.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

Messages.Schema = new SimpleSchema({
	sender: {
		type: String,
		label: 'the sender of the message'
	},
	receiver:{
		type: String,
		label: 'the receiver of the message'
	},
	publication:{
		type: Date,
		label: 'the date of the publication'
	},
	read: {
		type: Boolean,
		label: 'the status of the message'
	},
	content:{
		type: String,
		label: "the content of the message"
	}
});

Messages.attachSchema(Messages.Schema);

Factory.define('message', Messages, {
	sender: () => faker.hacker.phrase(),
	receiver: () => faker.hacker.phrase(),
	publication: () => new Date(),
	read: () => false
});
