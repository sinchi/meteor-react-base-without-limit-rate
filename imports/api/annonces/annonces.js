import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Brands } from '../brands/brands.js';
import { Cities } from '../cities/cities.js';
import { Categories } from '../categories/categories.js';


export const Annonces = new Mongo.Collection('annonces');

Annonces.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Annonces.deny({
	insert: () =>  true,
	update: () => true,
	remove: () => true
});

Annonces.AllSchema = new SimpleSchema({	
	title:{
		type: String,
		label: "AnnonceAll - The title of the annonce"
	},
	description:{
		type: String,
		label: 'AnnonceAll - The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'AnnonceAll - The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'AnnonceAll - the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'AnnonceAll - The price of the annonce'
	},
	owner:{
		type: String,
		label: 'AnnonceAll - the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'AnnonceAll - The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'AnnonceAll - The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'AnnonceAll - The number of the comments',
		optional: true,
		defaultValue:0 
	},
	category:{
		type: Categories.Schema,
		label: 'AnnonceAll - the category of the annonce'
	},
	readers:{
		type: [String],
		label: 'The ids of the readers they have seen the annonce',
		optional: true
	}
});

Annonces.CarSchema = new SimpleSchema({
	title:{
		type: String,
		label: "Annonce-Car - The title of the annonce"
	},
	description:{
		type: String,
		label: 'Annonce-Car - The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'Annonce-Car - The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'Annonce-Car - the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'Annonce-Car - The price of the annonce'
	},
	owner:{
		type: String,
		label: 'Annonce-Car - the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'Annonce-Car The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'Annonce-Car The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'Annonce-Car The number of the comments',
		optional: true
	},
	category:{
		type: Categories.Schema,
		label: 'Annonce-Car the category of the annonce'
	},
	brand: {
		type: Brands.Schema,
		label: 'Annonce-Car the brand of car'
	},
	model:{
		type: Brands.ModelsSchema,
		label: 'Annonce-Car the model of the car'
	},
	carbs:{
		type: String,
		label: 'Annonce-Car the carburant of car'
	},
	yearOfModel:{
		type: Number,
		label: 'Annonce-Car the year of the car\'s model'
	},
	km:{
		type: Number,
		label: 'Annonce-Car the km of the car'
	},
	readers:{
		type: [String],
		label: 'The ids of the readers they have seen the annonce',
		optional: true
	}
});

Annonces.MotorSchema = new SimpleSchema({
	title:{
		type: String,
		label: "Annonce-Motor - The title of the annonce"
	},
	description:{
		type: String,
		label: 'Annonce-Motor - The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'Annonce-Motor - The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'Annonce-Motor - the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'Annonce-Motor - The price of the annonce'
	},
	owner:{
		type: String,
		label: 'Annonce-Motor - the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'Annonce-Motor - The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'Annonce-Motor - The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'Annonce-Motor - The number of the comments',
		optional: true
	},
	category:{
		type: Categories.Schema,
		label: 'Annonce-Motor - the category of the annonce'
	},
	yearOfModel:{
		type: Number,
		label: 'Annonce-Motor - the year of the moto\'s model'
	},
	km:{
		type: Number,
		label: 'Annonce-Motor - the km of the car'
	},
	readers:{
		type: [String],
		label: 'The ids of the readers they have seen the annonce',
		optional: true
	}
});

Annonces.attachSchema(Annonces.AllSchema, { selector: { type: 'all' } });
Annonces.attachSchema(Annonces.CarSchema, { selector: { type: 'car' } });
Annonces.attachSchema(Annonces.MotorSchema, { selector: { type: 'motor' } });

Factory.define('annonceAll', Annonces, {
	title: () => faker.hacker.phrase(),
	description: () => faker.hacker.phrase(),
	typeAnnonce: () => 'demande',
	price: () => 100,
	owner: () => faker.hacker.phrase(),
	publication: () => new Date(),
	photos: () => ['tof1.jpg', 'tof2.jpg'],
	category: () => { name: 'Téléphone' },
	city: () => { name: 'Casablanca' },
	countComments: () => 0
});