import { Cities } from './cities.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertCity = new ValidatedMethod({
	name: "cities.insert",
	validate: new SimpleSchema({
		name:{ type: String }
	}).validator(),
	run(city){
		Cities.insert(city)
	},
});