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


export const updateCity = new ValidatedMethod({
	name: "city.update",
	validate: new SimpleSchema({
		_id: { type: String },
		"update.name": { type: String }
	}).validator(),
	run({ _id, update }){
		Cities.update(_id, { $set: update });
	}
});



export const removeCity = new ValidatedMethod({
	name: "city.remove",
	validate: new SimpleSchema({
		_id: { type: String }
	}).validator(),
	run({ _id }){
		Cities.remove(_id);
	}
});