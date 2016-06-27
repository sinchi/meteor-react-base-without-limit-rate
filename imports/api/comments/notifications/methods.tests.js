import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { insertNotification, updateNotification, removeNotification } from './methods.js';
import { NotificationComment } from './notifications-comment.js';

describe('Notifications Comments methods ', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert Notification Comment', function(){
		const notification = {
			annonce_id: "1" ,				
			commentId: '1',
			owner: "1",
			read: false,
			publication: new Date()
		};

		insertNotification.call(notification);
		const findNotification = NotificationComment.findOne({ annonce_id: notification.annonce_id });
		assert.equal(findNotification.owner, "1");

	});

	it('update Notification Comment', function(){
		const { _id, owner } = Factory.create('notification-comment');
		updateNotification.call({
			_id,
			owner: owner,
			update: {
				read: true
			}
		});
		const getNotif = NotificationComment.findOne(_id);
		assert.equal(getNotif.read, true);
	});


	it('remove Notification Comment', function(){
		const { _id, owner } = Factory.create('notification-comment');
		removeNotification.call({
			_id,
			owner: owner
		});
		const getNotif = NotificationComment.findOne(_id);
		assert.equal(getNotif, undefined);
	});

});