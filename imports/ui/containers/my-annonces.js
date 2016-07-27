import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { AnnoncesList } from "../components/annonces-list.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('my-annonces');
	if(subscriptions.ready()) {
		const annonces = Annonces.find({}, {sort:{ publication: -1 }}).fetch();
		onData(null, { annonces });
	}
};
export default composeWithTracker(composer, Loading)(AnnoncesList);
