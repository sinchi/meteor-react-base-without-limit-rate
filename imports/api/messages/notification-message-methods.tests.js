import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { insertNotificationMessage, removeNotificationMessage } from './notification-message-methods.js';
import { Meteor } from 'meteor/meteor';
import { NotificationMessage } from './notification-message.js';

describe('Notification Message Methods', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});


	it('insert notification message', function(){
		const notificationMessage = {			
			messageId: "1",
			receiver: "1"			
		};

		insertNotificationMessage.call(notificationMessage);
		const getNotificationMessage = NotificationMessage.findOne({ receiver: '1' });
		assert.equal(getNotificationMessage.messageId, "1");
	});

	it('remove notification message', function(){
		const { _id, receiver } = Factory.create('notification-message');
		removeNotificationMessage.call({
			_id, 
			owner: receiver
		});
		const getNotificationMessage = NotificationMessage.findOne(_id);

		assert.equal(getNotificationMessage, undefined);
	});
});