import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AbonnementCategory } from './abonnement-category.js';

export const insertAbonnementCategory = new ValidatedMethod({
	name: "abonnementCategory.insert",
	validate: new SimpleSchema({
		userId: { type: String },
		categoryId: { type: String }
	}).validator(),
	run(abonnementCategory){
		let abonnement = AbonnementCategory.findOne({ userId: abonnementCategory.userId, categoryId: abonnementCategory.categoryId });
		if(!abonnement)
			AbonnementCategory.insert(abonnementCategory);
		else
			 throw new Meteor.Error(403, "Vous êtes déjà abonné à cette catégorie");
	}
});

export const removeAbonnementCategory = new ValidatedMethod({
	name: "abonnementCategory.remove",
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
