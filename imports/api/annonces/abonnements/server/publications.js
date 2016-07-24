import { Meteor } from 'meteor/meteor';
import { AbonnementCategory } from '../abonnement-category.js';
import { Categories } from '../../../categories/categories.js';

Meteor.publishComposite('abonnement-category', function(){

  return{
    find: function(){
      return AbonnementCategory.find({userId: this.userId});
    },
    children:[
      {
        find: function(abonnement){
          return Categories.find({ _id: abonnement.categoryId });
        }
      }
    ]
  }

});
