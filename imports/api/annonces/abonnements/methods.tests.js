import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import { insertAbonnementCategory, removeAbonnementCategory } from './methods.js';
import { AbonnementCategory } from './abonnement-category.js';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

describe('Abonnement Category Methods', function(){
	beforeEach(function(){
		if(Meteor.isServer){
			resetDatabase();
		}
	});

	it('insert Abonnement Category', function(){
		const abonnementCategory = {
			userId: '123',
			categoryId: '111'
		};

		insertAbonnementCategory.call(abonnementCategory);
		const getAbonnementCategory = AbonnementCategory.findOne({ userId: '123' });
		assert.equal(getAbonnementCategory.categoryId, '111');
	});


	it('remove Abonnement Category', function(){
		const { _id, userId } = Factory.create('abonnement-category');
		removeAbonnementCategory.call({ _id, userId});
		const getAbonnementCategory = AbonnementCategory.findOne(_id);
		assert.equal(getAbonnementCategory, undefined);
	});
});