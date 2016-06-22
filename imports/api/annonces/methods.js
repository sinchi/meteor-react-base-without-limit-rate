import { Annonces } from './annonces.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertAnnonce = new ValidatedMethod({
	name: "annonces.insert",
	validate: new SimpleSchema({
		title:{ type: String },
		description: { type: String },
		typeAnnonce: { type: String, allowedValues: [ 'offre', 'demande' ] },
		price: { type: Number }
	}).validator(),
	run(annonce){
		Annonces.insert(annonce)
	},
});

export const updateAnnonce = new ValidatedMethod({
	name: 'annonce.update',
	validate: new SimpleSchema({
		_id: { type: String },
		'update.title': { type: String },
		'update.description' :  { type: String },
		'update.typeAnnonce': { type: String, allowedValues:[ 'offre', 'demande' ] },
		'update.price': { type: Number }
	}).validator(),
	run({ _id, update }){
		Annonces.update(_id, { $set: update });
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