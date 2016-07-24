import { Meteor } from 'meteor/meteor';
import { AbonnementCategory } from '../abonnement-category.js';

Meteor.publish('abonnement-category', function(){

    return AbonnementCategory.find({userId: this.userId});
});
