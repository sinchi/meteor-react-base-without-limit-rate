import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { AnnonceItem } from "../pages/annonce-item.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  console.log(params.params);
  console.log("container param router id : " + params.params.annonceId);
	const subscriptions = Meteor.subscribe('annonceItem', params.params.annonceId);
	if(subscriptions.ready()) {
		const annonces = Annonces.find({}, {sort:{ publication: -1 }}).fetch();
		onData(null, { annonces });
	}
};
export default composeWithTracker(composer, Loading)(AnnonceItem);
