import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Brands = new Mongo.Collection('brands');

ModelsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "The name of the model"
	}
});

Brands.schema = new SimpleSchema({
	
	name:{
		type: String,
		label: "The title of the brand"		
	},
	models:{
		type: [ModelsSchema],
		label: "The models of the brand"
	}
});


Brands.attachSchema(Brands.schema);
