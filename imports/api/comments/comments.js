import { Mongo }  from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Comments = new Mongo.Collection('comments');

Comments.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Comments.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

Comments.Schema = new SimpleSchema({
	owner: {
		type: String,
		label: "Comment - the id of the comment's owner"
	},
	annonce_id:{
		type: String,
		label: 'Comment - the id of annonce'
	},
	body:{
		type: String,
		label: 'Comment - the body content of the comment',
		optional: true
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'Comment - the datetime of publication of the comment',
		optional: true
	}
});

