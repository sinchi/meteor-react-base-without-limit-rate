import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Comments } from './comments.js';
import { Meteor } from 'meteor/meteor';
import { insertNotification } from '../notifications/methods.js';
import { Annonces } from '../annonces/annonces.js';


export const insertComment = new ValidatedMethod({
	name: 'comments.insert',
	validate: new SimpleSchema({
		owner: { type: String },
		annonce_id: { type: String },
		publication: { type: Date, defaultValue: new Date(), optional: true },
		body: { type: String }
	}).validator(),
	run(comment){
		
		//const comment = Comments.findOne(commentId);
		const annonce = Annonces.findOne(comment.annonce_id);

		if(annonce){
			const commentId = Comments.insert(comment);
			const getAllCommentsByAnnonceId = Comments.find({ annonce_id: comment.annonce_id });
			getAllCommentsByAnnonceId.map((com) => {
				
					const owner = com.owner;
				
					const notification = {
						owner: owner,
						annonce_id: annonce._id,
						commentId: commentId,
						read: false,
						publication: new Date()
					};
					if(owner !== annonce.owner){
						insertNotification.call(notification);
					}
			});	
		}else{
			throw new Meteor.Error(404, 'this annonce not exist');
		}
	}
});


export const updateComment = new ValidatedMethod({
	name: 'comments.update',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String },
		'update.body' : { type: String }
	}).validator(),
	run({ _id, owner, update }){
		const comment = Comments.findOne(_id);
		if(comment && comment.owner === owner)
			Comments.update(_id, { $set: update });	
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to update this comment');			
	}
});


export const removeComment = new ValidatedMethod({
	name: 'comments.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String }
	}).validator(),
	run({ _id, owner }){
		const comment = Comments.findOne(_id);
		if(comment && comment.owner === owner)
			Comments.remove(_id);
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to remove this comment');
	}
});



