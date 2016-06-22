import { Meteor } from 'meteor/meteor';
import { Brands } from '../brands.js';

Meteor.publish('brands', function(){
	
	  return Brands.find();

});