import { Meteor } from 'meteor/meteor';

Meteor.publish('user', function(userId){
  check(userId, String);
  return Meteor.users.findOne(userId, { fields: { profile: 1} });
});
