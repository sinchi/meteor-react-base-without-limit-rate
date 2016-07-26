import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { Categories } from '../../api/categories/categories.js';
import { NotificationAnnonce } from '../../api/annonces/notifications/notification-annonce.js';
import { NotificationsCategoriesPage } from "../pages/notifications-categories-page.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';


const composer = (props, onData) => {
  console.log(props.params.categoryId);
     const subscriptions = Meteor.subscribe('annoncesByCategory', props.params.categoryId);
     if(subscriptions.ready()) {
       const annonces = Annonces.find({}, {sort:{ publication: -1 }}).fetch();
       console.log(annonces);
       onData(null, { annonces });
     }


};
export default composeWithTracker(composer, Loading)(NotificationsCategoriesPage);
