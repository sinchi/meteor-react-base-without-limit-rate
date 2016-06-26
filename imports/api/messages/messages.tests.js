import { assert } from 'meteor/practicalmeteor:chai';
import { Messages } from './messages';

describe('Messages Collection', function(){
	it('Messages into Mongo', function(){
		assert.equal(typeof Messages, 'object');
	});
});