import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { MyAnnoncesListComponent } from "../components/my-annonces-list-component.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('my-annonces');
	if(subscriptions.ready()) {
		const annonces = Annonces.find({}, {sort:{ publication: -1 }}).fetch();
		console.log("myAnnonce", annonces);
		onData(null, { annonces });
	}
};
export default composeWithTracker(composer, Loading)(MyAnnoncesListComponent);
