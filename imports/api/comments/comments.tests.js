import { assert } from 'meteor/practicalmeteor:chai';
import { Comments } from './comments.js';
import { Meteor } from 'meteor/meteor';

describe('Comments collections', function(){
	it('Comments into Mongo ', function(){
			assert.equal(typeof Comments, 'object');
	});
});