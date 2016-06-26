import { assert } from 'meteor/practicalmeteor:chai';
import { Notifications } from './notifications.js';

describe('Notifications Collection', function(){
	it('Notifications Colelction created into Mongo', function(){
		assert.equal(typeof Notifications, 'object');
	});
});