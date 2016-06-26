import { assert } from 'meteor/practicalmeteor:chai';
import { NotificationMessage } from './notification-message.js';

describe('Notification Message Collection',function(){
	it('Notification Message into Mongo', function(){
		assert.equal(typeof NotificationMessage, 'object');
	});
});