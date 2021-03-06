import { Meteor } from 'meteor/meteor';
import { Sequence } from '../sequence.js';

Meteor.publish('sequences', function(name){
  check(name, String);
	return Sequence.find({_id: name});
});
