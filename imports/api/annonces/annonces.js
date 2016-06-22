import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';


export const Annonces = new Mongo.Collection('annonces');

Annonces.schema = new SimpleSchema({	
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
	price: { 
		type: Number,
		label: 'The price of the annonce'
	}
});

Annonces.attachSchema(Annonces.schema);

Factory.define('annonce', Annonces, {
	title: () => faker.hacker.phrase(),
	description: () => faker.hacker.phrase(),
	typeAnnonce: () => 'offre',
	price: () => 100
});