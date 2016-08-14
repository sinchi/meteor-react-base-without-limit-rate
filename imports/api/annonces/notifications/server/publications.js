import { Meteor } from 'meteor/meteor';
import { NotificationAnnonce } from '../notification-annonce.js';
import { Annonces } from '../../../annonces/annonces.js';
import { Categories } from '../../../categories/categories.js';

Meteor.publishComposite('notification-annonce', function(){

  return{
    find: function(){
      return NotificationAnnonce.find({userId: this.userId, read:false});
    },
    children:[
      {
        find: function(notificationAnnonce){
          return Categories.find({ _id: notificationAnnonce.category });
        }
      }
    ]
  }

});


Meteor.publishComposite('notification-annonce-by-category', function(categoryId){
  check(categoryId, String);
  return{
    find: function(){
      return NotificationAnnonce.find({userId: this.userId, category: categoryId});
    },
    children:[
      {
        find: function(notificationAnnonce){
          return Annonces.find({ _id: notificationAnnonce.annonceId });
        },
        find: function(notificationAnnonce){
          return Meteor.users.find({ _id: notificationAnnonce.userId }, { fields: { profile: 1 } })
        }
      }
    ]
  }

});
