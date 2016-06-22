import { Categories } from './categories.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertCategory = new ValidatedMethod({
	name: "categories.insert",
	validate: new SimpleSchema({
		name:{ type: String },
		parent:{ type: String, optional: true }
		
	}).validator(),
	run(category){
		Categories.insert(category)
	},
});