import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Categories = new Mongo.Collection('categories');

Categories.Schema = new SimpleSchema({
	name:{
		type: String,
		label: "The name of the category",
	},
	parent:{
		type: String,
		label: "The parent of the category",
		optional: true
	}
});

Categories.attachSchema(Categories.Schema);
