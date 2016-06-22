import { assert } from 'meteor/practicalmeteor:chai';
import { Annonces } from './annonces.js';

describe('Annonces Collection', function(){
	it('test Annonces in Mongo', function(){
		assert.equal(typeof Annonces, 'object');
	});
});