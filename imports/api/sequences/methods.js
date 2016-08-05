import { ValidatedMethod } from 'meteor/mdg:validated-method.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Sequence } from '../sequences/sequence.js';

export const sequenceInc = new ValidatedMethod({
	name: "sequences.update",
	validate: new SimpleSchema({
		name: {type: String}
	}).validator(),
	run({ name }){
		Sequence.update({ _id:name }, { $inc: { seq: 1 } });
	}
});
