import { Meteor } from 'meteor/meteor';
import { Annonces } from '../annonces.js';


Meteor.publish('annonces', function(search){

	check( search, Match.OneOf( String, null, undefined ) );

	  let query  = {},
	      projection = { limit: 10, sort: { title: 1 } };

	  if ( search ) {
	    let regex = new RegExp( search, 'i' );

	    query = {
	      $or: [
	        { title: regex },
	      ],
				public: true
	    };

			return Annonces.find( query, projection );
	  }

	  return Annonces.find({public: true});

});


Meteor.publishComposite('annonceItem', function(annonceId){
	check(annonceId, String);
	return{
		find: function(){
			return Annonces.find({ _id: annonceId });
		},
		children:[
			{
				find: function(annonce){
					return Meteor.users.find({ _id: annonce.owner });
				}
			}
		]
	}
});

Meteor.publish('my-annonces', function(){
		return Annonces.find({ owner: this.userId });
});


Meteor.publishComposite('annoncesWithRelation', function(search){


  check( search, Match.OneOf( String, null, undefined ) );

    let query  = {},
        projection = { limit: 10, sort: { title: 1 } };

    if ( search ) {
      let regex = new RegExp( search, 'i' );

      query = {
        $or: [
          { title: regex },
        ],
        public: true
      };


      return{
    		find: function(){
    		  return Annonces.find( query, projection );
    		},
    		children:[
    			{
    				find: function(annonce){
    					return Meteor.users.find({ _id: annonce.owner });
    				}
    			}
    		]
    	}
    }

    return{
      find: function(){
        return Annonces.find({public: true});
      },
      children:[
        {
          find: function(annonce){
            return Meteor.users.find({ _id: annonce.owner });
          }
        }
      ]
    }

});
