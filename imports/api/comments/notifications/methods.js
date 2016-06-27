import { ValidatedMethod } from 'meteor/mdg:validated-method.js'
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { NotificationComment } from './notifications-comment.js';
import { Meteor } from 'meteor/meteor';

export const insertNotification = new ValidatedMethod({
	name: 'notificationsComment.insert',
	validate: new SimpleSchema({
		annonce_id: { type: String } ,				
		commentId: { type: String },
		owner: { type: String },
		read: { type: Boolean },
		publication: { type: Date }
	}).validator(), 
	run(notification){
		NotificationComment.insert(notification);
	}
});


export const updateNotification = new ValidatedMethod({
	name: 'notificationsComment.update',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String },
		'update.read': { type: Boolean }
	}).validator(),
	run({ _id, owner, update }){
		const notification = NotificationComment.findOne(_id);
		if(notification &&  notification.owner === owner)
			NotificationComment.update(_id, { $set: update });
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to update this notification');
	}
});

export const removeNotification = new ValidatedMethod({
	name: 'notificationsComment.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String },
	}).validator(),
	run({ _id , owner}){
		const notification = NotificationComment.findOne(_id);
		if( notification &&  notification.owner === owner)
			NotificationComment.remove(_id);
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to remove this notification');
	}
});