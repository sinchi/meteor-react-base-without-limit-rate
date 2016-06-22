import { Meteor } from 'meteor/meteor';
import { Cities } from '../cities.js';

Meteor.publish('cities', function(){

	
	  return Cities.find();

});