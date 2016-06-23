import { Annonces } from './annonces.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Categories } from '../categories/categories.js';
import { Cities } from '../cities/cities.js';


export const insertAnnonce = new ValidatedMethod({
	name: "annoncesAll.insert",
	validate: new SimpleSchema({
		title:{ type: String },
		description: { type: String },
		typeAnnonce: { type: String, allowedValues: [ 'offre', 'demande' ] },
		price: { type: Number },
		owner: { type: String },
		publication: { type: Date },
		photos: { type: [ String ] , maxCount: 6},
		category: { type: Categories.Schema },
		city: { type:  Cities.Schema }
	}).validator(),
	run(annonce){
		Annonces.insert(annonce, { selector: { type: 'all' } });
	}
});

export const updateAnnonce = new ValidatedMethod({
	name: 'annonce.update',
	validate: new SimpleSchema({
		_id: { type: String },
		'update.title': { type: String , optional: true},
		'update.description' :  { type: String , optional: true},
		'update.typeAnnonce': { type: String, allowedValues:[ 'offre', 'demande' ] , optional: true},
		'update.price': { type: Number , optional: true},
		'update.publication': { type: Date , optional: true},
		'update.photos': { type: [ String ] , maxCount: 6,  optional: true},
		'update.modification': { type: Date, defaultValue: new Date() , optional: true},
		'update.category' : { type: Categories.Schema, optional: true },
		'update.city' : { type: Cities.Schema, optional: true }

	}).validator(),
	run({ _id, update }){	
		Annonces.update(_id, { $set: update }, { selector: { type: 'all' } });

	}
});

export const removeAnnonce = new ValidatedMethod({
	name: 'annonce.remove',
	validate: new SimpleSchema({
		_id: { type: String }
	}).validator(),
	run({ _id }){
		Annonces.remove(_id);
	}
});

