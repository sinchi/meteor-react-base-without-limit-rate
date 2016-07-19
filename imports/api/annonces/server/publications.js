import { Meteor } from 'meteor/meteor';
import { Annonces } from '../annonces.js';

Meteor.publish('annonces', function(search){

	check( search, Match.OneOf( String, null, undefined ) );

	  let query      = {public: true},
	      projection = { limit: 10, sort: { title: 1 } };

	  if ( search ) {
	    let regex = new RegExp( search, 'i' );

	    query = {
	      $or: [
	        { title: regex },
	      ]
	    };

			return Annonces.find( query, projection );
	  }

	  return Annonces.find({public: true});

});
