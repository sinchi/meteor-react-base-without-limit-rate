import { assert } from 'meteor/practicalmeteor:chai';
import { AbonnementCategory } from './abonnement-category.js';

describe('Abonnement Category', function(){
	it('Abonnement Category into mongo', function(){
		assert.equal(typeof AbonnementCategory, 'object');
	});
});