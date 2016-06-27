import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { insertNotificationNewAnnonce, removeNotificationNewAnnonce } from './methods.js';
import { NotificationAnnonce } from './notification-annonce.js';
import { Factory } from 'meteor/dburles:factory';

describe('Notification Annonce Methods', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert notification annonce', function(){
		const notificationAnnonce = {
				userId: "123",
				annonceId: "111",
				publication: new Date(),
				read: false
		};

		insertNotificationNewAnnonce.call(notificationAnnonce);
		const getNotificationAnnonce = NotificationAnnonce.findOne({ userId: "123" });
		assert.equal(getNotificationAnnonce.annonceId, "111");
	});


	it('remove notification annonce', function(){
		const { _id, userId} = Factory.create('notification-annonce');
		removeNotificationNewAnnonce.call({ _id, userId});
		const getNotificationAnnonce = NotificationAnnonce.findOne(_id);
		assert.equal(getNotificationAnnonce, undefined);
	});
});