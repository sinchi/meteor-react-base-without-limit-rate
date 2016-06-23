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
		label: "The title of the annonce"
	},
	description:{
		type: String,
		label: 'The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'The price of the annonce'
	},
	owner:{
		type: String,
		label: 'the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'The number of the comments',
		optional: true,
		defaultValue:0 
	},
	category:{
		type: Categories.Schema,
		label: 'the category of the annonce'
	}
});

Annonces.CarSchema = new SimpleSchema({
	title:{
		type: String,
		label: "The title of the annonce"
	},
	description:{
		type: String,
		label: 'The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'The price of the annonce'
	},
	owner:{
		type: String,
		label: 'the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'The number of the comments',
		optional: true
	},
	category:{
		type: Categories.Schema,
		label: 'the category of the annonce'
	},
	brand: {
		type: Brands.Schema,
		label: 'the brand of car'
	},
	model:{
		type: Brands.ModelsSchema,
		label: 'the model of the car'
	},
	carbs:{
		type: String,
		label: 'the carburant of car'
	},
	yearOfModel:{
		type: Number,
		label: 'the year of the model\'s car'
	},
	km:{
		type: Number,
		label: 'the km of the car'
	}
});

Annonces.MotorSchema = new SimpleSchema({
	title:{
		type: String,
		label: "The title of the annonce"
	},
	description:{
		type: String,
		label: 'The description of the annonce'
	},
	typeAnnonce:{
		type: String,
		allowedValues:[ 'offre', 'demande' ],
		label: 'The type of this opportunitie'
	},
	city:{
		type: Cities.Schema,
		label: 'the city of the annonce'
	},
	price: { 
		type: Number,
		label: 'The price of the annonce'
	},
	owner:{
		type: String,
		label: 'the owner of the annonce'
	},
	publication:{
		type: Date,
		defaultValue: new Date(),
		label: 'The date of the publication of the annonce'
	},
	photos: {
		type: [ String ],
		label: 'The photos of the annonce',
		maxCount: 6
	},
	countComments: {
		type: Number,
		label: 'The number of the comments',
		optional: true
	},
	category:{
		type: Categories.Schema,
		label: 'the category of the annonce'
	},
	yearOfModel:{
		type: Number,
		label: 'the year of the model\'s car'
	},
	km:{
		type: Number,
		label: 'the km of the car'
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