import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories.js';

Meteor.publish('categories', function(){
	return Categories.find();
});
