import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const AbonnementCategory = new Mongo.Collection('abonnement-category');

AbonnementCategory.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

AbonnementCategory.deny({
	insert: () => true,
	update: () => true,
	remove: () => true,
});

AbonnementCategory.Schema = new SimpleSchema({
	userId: {
		type: String,
		unique: true,
		label: 'the user id '
	},
	categoryId: {
		type: String,
		label: 'The Category Id'
	}
});

AbonnementCategory.attachSchema(AbonnementCategory.Schema);

Factory.define('abonnement-category', AbonnementCategory, {
	userId: () => faker.hacker.phrase(),
	categoryId: () => faker.hacker.phrase()
});