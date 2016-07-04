import { Meteor } from 'meteor/meteor';
import { Annonces } from '../annonces.js';

Meteor.publish('annonces', function(search){

	check( search, Match.OneOf( String, null, undefined ) );

	  let query      = {},
	      projection = { limit: 10, sort: { title: 1 } };

	  if ( search ) {
	    let regex = new RegExp( search, 'i' );

	    query = {
	      $or: [
	        { title: regex },
	        // { artist: regex },
	        // { year: regex }
	      ]
	    };

	    projection.limit = 100;
	  }

	  return Annonces.find( query, projection );

});
