import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Messages } from './messages.js';

export const  insertMessage = new ValidatedMethod({
	name: 'messages.insert',
	validate: new SimpleSchema({
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
		}
	}).validator(),
	run( message ){
		
		Messages.insert(message);
	}
});


export const updateMessage = new ValidatedMethod({
	name: 'messages.update',
	validate: new SimpleSchema({

	})
})