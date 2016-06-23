import { assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

describe('Users Collection', function(){
	it('Users exist in Mongo', function(){
		assert.equal(typeof Meteor.users, 'object');
	});
});