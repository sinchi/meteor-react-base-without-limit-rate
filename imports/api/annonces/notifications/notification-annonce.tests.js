import { assert } from 'meteor/practicalmeteor:chai';
import { NotificationAnnonce } from './notification-annonce.js';


describe('Notification New Annonce', function(){
	it('Notification new Annonce into Mongo', function(){
		assert.equal(typeof NotificationAnnonce, 'object');
	});
});