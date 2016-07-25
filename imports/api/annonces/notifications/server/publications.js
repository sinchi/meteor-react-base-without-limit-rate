import { Meteor } from 'meteor/meteor';
import { NotificationAnnonce } from '../notification-annonce.js';
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
