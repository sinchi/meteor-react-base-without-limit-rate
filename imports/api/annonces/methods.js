import { Annonces } from './annonces.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Categories } from '../categories/categories.js';
import { Cities } from '../cities/cities.js';
import { AbonnementCategory } from './abonnements/abonnement-category.js';
import { insertNotificationNewAnnonce } from './notifications/methods.js';
import { Meteor } from 'meteor/meteor';


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
		city: { type:  Cities.Schema },
		brand: {
			type: String,
			label: 'Annonce-Car the brand of car',
			optional: true
		},
		model:{
			type: String,
			label: 'Annonce-Car the model of the car',
			optional: true
		},
		carbs:{
			type: String,
			label: 'Annonce-Car the carburant of car',
			optional: true
		},
		yearOfModel:{
			type: Number,
			label: 'Annonce-Car the year of the car\'s model',
			optional: true
		},
		km:{
			type: Number,
			label: 'Annonce-Car the km of the car',
			optional: true
		},
	}).validator(),
	run(annonce){
		let _id;

		switch (annonce.category.name) {
			case 'Voitures':
				_id =  Annonces.insert(annonce, { selector: { type: 'car' } });
				break;
			case 'Motos':
				_id =  Annonces.insert(annonce, { selector: { type: 'moto' } });
			break;

			default:
				_id =  Annonces.insert(annonce, { selector: { type: 'all' } });
		}

		const categoryId = Categories.findOne({ name: annonce.category.name });
		const getAbonnes = AbonnementCategory.find({ categoryId: categoryId });
		getAbonnes.map((abonnement) => {
			const notificationAnnonce = {
				userId: abonnement.userId,
				annonceId: _id,
				publication: new Date(),
				read: false
			};

			insertNotificationNewAnnonce.call(notificationAnnonce);
		});

	}
});

export const updateAnnonce = new ValidatedMethod({
	name: 'annonce.update',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String },
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
	run({ _id, owner, update }){
		const annonce = Annonces.findOne(_id);
		if(annonce && annonce.owner === owner)
			Annonces.update(_id, { $set: update }, { selector: { type: 'all' } });
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to update this annonce');

	}
});

export const removeAnnonce = new ValidatedMethod({
	name: 'annonce.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		owner: { type: String }
	}).validator(),
	run({ _id, owner }){
		const annonce = Annonces.findOne(_id);
		if(annonce && annonce.owner === owner)
			Annonces.remove(_id);
		else
			throw new Meteor.Error(403, 'you don\'t have the permission to remove this annonce');
	}
});

export const updateReaders = new ValidatedMethod({
	name: 'annonce.updateReaders',
	validate: new SimpleSchema({
		_id: { type: String },
		userId: { type: String }
	}).validator(),
	run({ _id, userId }){
		const annonce = Annonces.findOne(_id);
		/*if(annonce && !annonce.readers){
			annonce.readers = [];
		}*/
		if(annonce &&  !_.contains(annonce.readers, userId)){
			Annonces.update(_id, { $addToSet: { readers: userId } }, { selector: { type: 'all' } });
		}else{
			throw new Meteor.Error(403, "This user have already see this annonce");
		}

	}
});
