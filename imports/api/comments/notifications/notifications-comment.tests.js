import { assert } from 'meteor/practicalmeteor:chai';
import { NotificationComment } from './notifications-comment.js';

describe('Notifications Comments Collection', function(){
	it('Notifications Comments Collection created into Mongo', function(){
		assert.equal(typeof NotificationComment, 'object');
	});
});