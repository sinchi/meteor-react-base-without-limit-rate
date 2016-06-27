import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import { insertUser, updateUser, removeUser } from './methods.js';


describe('Users collection', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert User', function(){
		const user = { 
			username: 'sinchi',
			createdAt: new Date(),
			profile: {
			 firstName: 'ayoub', 
			 lastName: 'belghar' 
			} 
		};

		insertUser.call(user);
		const getUser = Meteor.users.findOne({ username: 'sinchi' });
		assert.equal(getUser.username, 'sinchi');
	});

	it('update user', function(){
		
		const _id = Meteor.users.insert({ username: 'sinchi', createdAt: new Date()});
		updateUser.call({
			_id,
			update: {
				username: 'belghar',
				profile:{
					firstName:'moaad',
					lastName:'belghar'
				}
			}
		});
		const getUser = Meteor.users.findOne(_id);
		assert.equal(getUser.profile.firstName, 'moaad');

	});

	it('remove user', function(){
		const _id = Meteor.users.insert({  username: 'lamda', createdAt: new Date() });
		removeUser.call({ _id });
		const getUser = Meteor.users.findOne(_id);
		assert.equal(getUser, undefined);
	});


	it('follow user', function(){
		const _id = Meteor.users.insert({  username: 'lamda', createdAt: new Date() });
		
	})

});