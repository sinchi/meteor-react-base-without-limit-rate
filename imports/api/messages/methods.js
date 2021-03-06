import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Messages } from './messages.js';
import { Sequence } from '../sequences/sequence.js';
import { rateLimit } from '../../modules/rate-limit.js';


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
			label:"The date of the message"
		},
		read: {
			type: Boolean,
			label: 'the status of the message'
		},
		content:{
			type: String,
			label: "the content of the message"
		},
		order:{
			type:Number,
			label: "the order of the message"
		}
	}).validator(),
	run( message ){
		Messages.insert(message);
	}
});


export const messageReceived = new ValidatedMethod({
	name: "message.update",
	validate: new SimpleSchema({
		sender: {type: String}
	}).validator(),
	run({ sender }){
		Messages.update({ "sender": sender, "receiver": Meteor.userId() }, { $set:{ "read": true } } , { multi: true });
	}
});


// rateLimit({
//   methods: [
//     messageReceived,
//     insertMessage,
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
