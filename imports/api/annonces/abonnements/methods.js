import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AbonnementCategory } from './abonnement-category.js';

export const insertAbonnementCategory = new ValidatedMethod({
	name: 'abonnementCategory.insert',
	validate: new SimpleSchema({
		userId: { type: String },
		categoryId: { type: String }
	}).validator(),
	run(abonnementCategory){		
		AbonnementCategory.insert(abonnementCategory);
	}
});

export const removeAbonnementCategory = new ValidatedMethod({
	name: 'abonnementCategory.remove',
	validate: new SimpleSchema({
		_id: { type: String },
		userId: { type: String }
	}).validator(),
	run({ _id, userId }){
		const abonnementCategory = AbonnementCategory.findOne(_id);

		if(abonnementCategory && abonnementCategory.userId === userId)
			AbonnementCategory.remove(_id);
	}
});