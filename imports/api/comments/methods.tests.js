import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import {  assert } from 'meteor/practicalmeteor:chai';
import { Comments } from './comments.js';
import { insertComment, updateComment, removeComment } from './methods.js';
import { insertAnnonce } from '../annonces/methods.js';
import { Annonces } from '../annonces/annonces.js';



describe('Comments Methods', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert comment', function(){

		const  annonce  = {
		 	  title: 'ayoub',
		  	  description: 'belghar ayoub',
			  typeAnnonce:'offre',
			  price: 100 ,
			  owner: '900',
			  publication: new Date(),
			  photos: ['tof.jpg'],
			  city: { name: 'Casablanca' },
			  category: { name: 'Téléphone' }
		};
		const _id   = Annonces.insert(annonce, { selector: { type: 'all' } });

		const comment = {
			 owner: '10', 
			 annonce_id: _id , 
			 publication: new Date(), 
			 body: 'wow cool'
		};

		insertComment.call(comment);

		const getComment = Comments.findOne({ owner: '10' });
		assert.equal(getComment.body, 'wow cool');
	});

	it('update comment', function(){
		const comment = { owner: '11', annonce_id: '1' , publication: new Date(), body: 'wow'}; 
		const _id = Comments.insert(comment);
		
		updateComment.call({
			_id,	
			owner: comment.owner,					 
			update: {
				body: 'haha'
			}
		});
		
		const findComment = Comments.findOne(_id);
		assert.equal(findComment.body, 'haha');
	});

	it('remove Comment', function(){
		const comment = { owner: '11', annonce_id: '1' , publication: new Date(), body: 'wow'}; 
		const _id = Comments.insert(comment);

		removeComment.call({ _id , owner: comment.owner });
		const findComment = Comments.findOne(_id);
		assert.equal(findComment, undefined);
	});
});