import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UserProfile } from './users.js';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export const insertUser = new ValidatedMethod({
	name: 'users.insert',
	validate: new SimpleSchema({
		username: { type: String, optional: true },
		'profile.firstName': { type: String , optional: true},
		'profile.lastName': { type: String , optional: true},
		createdAt: { type: Date }
	}).validator(),
	run(user){

	      Accounts.createUser(user);
		//	Meteor.users.insert(user);
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


export const followUser = new ValidatedMethod({
	name: "users.followUser",
	validate: new SimpleSchema({
		userId: { type: String },
		followerId: { type: String }
	}).validator(),
	run({ userId, followerId }){
		const user = Meteor.users.findOne(userId);
		if(user)
			Meteor.users.update(userId, { $addToSet: { profile: { followers: followerId } } });
		else
			throw new Meteor.Error(404, "This user don't exist")
	}
})