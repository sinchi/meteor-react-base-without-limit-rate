import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { insertNotification, updateNotification, removeNotification } from './methods.js';
import { Notifications } from './notifications';

describe('Notifications methods ', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert Notification', function(){
		const notification = {
			annonce_id: "1" ,				
			commentId: '1',
			owner: "1",
			read: false,
			publication: new Date()
		};

		insertNotification.call(notification);
		const findNotification = Notifications.findOne({ annonce_id: notification.annonce_id });
		assert.equal(findNotification.owner, "1");

	});

	it('update Notification', function(){
		const { _id, owner } = Factory.create('notification');
		updateNotification.call({
			_id,
			owner: owner,
			update: {
				read: true
			}
		});
		const getNotif = Notifications.findOne(_id);
		assert.equal(getNotif.read, true);
	});


	it('remove Notification', function(){
		const { _id, owner } = Factory.create('notification');
		removeNotification.call({
			_id,
			owner: owner
		});
		const getNotif = Notifications.findOne(_id);
		assert.equal(getNotif, undefined);
	});

});