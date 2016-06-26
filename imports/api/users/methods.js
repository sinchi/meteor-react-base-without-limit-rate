import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserProfile } from './users.js';

export const insertUser = new ValidatedMethod({
	name: 'users.insert',
	validate: new SimpleSchema({
		username: { type: String, optional: true },
		'profile.firstName': { type: String , optional: true},
		'profile.lastName': { type: String , optional: true},
		createdAt: { type: Date }
	}).validator(),
	run(user){
		Meteor.users.insert(user);
	}
});


export const updateUser = new ValidatedMethod({
	name: 'users.update',
	validate: new SimpleSchema({
		_id: { type: String },
		'update.username': { type: String },
		'update.profile.firstName': { type: String },
		'update.profile.lastName': { type: String },
	}).validator(),
	run({ _id,  update}){
		Meteor.users.update(_id, { $set: update });
	}
});


export const removeUser = new ValidatedMethod({
	name: 'user.remove',
	validate: new SimpleSchema({
		_id: { type: String }
	}).validator(),
	run({ _id }){
		Meteor.users.remove(_id);
	}
});	