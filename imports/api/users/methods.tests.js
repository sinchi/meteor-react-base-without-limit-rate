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
		insertUser.call({ profile: { firstName: 'ayoub', lastName: 'belghar' } });
		const getUser = Meteor.users.findOne({ profile: { firstName: 'ayoub' } });
		assert.equal(getUser.profile.firstName, 'ayoub');
	});

	it('update user', function(){
		
		const _id = Meteor.users.insert({ username: 'sinchi'});
		updateUser.call({
			_id: _id,
			update: {
				username: 'belghar'
			}
		});
		const getUser = Meteor.users.findOne(_id);
		assert.equal(getUser.username, 'belghar');

	});

	it('remove user', function(){
		const _id = Meteor.users.insert({  username: 'lamda' });
		removeUser.call({ _id });
		const getUser = Meteor.users.findOne(_id);
		assert.equal(getUser, undefined);
	});

});