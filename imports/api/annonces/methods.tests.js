import { Meteor } from 'meteor/meteor' ;
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Annonces } from './annonces.js';
import { insertAnnonce, updateAnnonce, removeAnnonce } from './methods.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'meteor/practicalmeteor:chai';

describe('Annonces collection', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insertAnnonce test', function(){		
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
		insertAnnonce.call(annonce);
		const getAnnonce = Annonces.findOne({ title: 'ayoub' });
		assert.equal(getAnnonce.title, 'ayoub');
	});

	it('updateAnnonce test', function(){
		const { _id } = Factory.create('annonceAll');
		updateAnnonce.call({ 
			_id,
			update:{
				title: 'belghar',
				description: 'driss belghar',
				typeAnnonce: 'offre',
				price: 300,				
			//	modification: new Date(),
				photos: [ 'tof1.jpg' ]
			}
		});
		const getAnnonce = Annonces.findOne(_id);
		assert.equal(getAnnonce.title, 'belghar');
	});

	it('removeAnnonce test', function(){
		const { _id } = Factory.create('annonce');
		removeAnnonce.call({_id});
		const getAnnonce = Annonces.findOne(_id);
		assert.equal(getAnnonce, undefined);
	});


});

