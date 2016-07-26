import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { NotificationsCategoriesPage } from "../pages/notifications-categories-page.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';


const composer = (params, onData) => {
  console.log(params.params.categoryId);
    // const subscriptions = Meteor.subscribe('notification-annonce-by-category', params.params.categoryId);
    // if(subscriptions.ready()) {
    //   const annonces = Annonces.find().fetch();
    //   console.log(annonces);
    //   onData(null, { annonces });
    // }


};
export default composeWithTracker(composer, Loading)(NotificationsCategoriesPage);
