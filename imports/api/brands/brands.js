import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Brands = new Mongo.Collection('brands');

Brands.ModelsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "The name of the model"
	}
});


Brands.Schema = new SimpleSchema({	
	name:{
		type: String,
		label: "The title of the brand"		
	},
	models:{
		type: [Brands.ModelsSchema],
		label: "The models of the brand"
	}
});


Brands.attachSchema(Brands.Schema);
