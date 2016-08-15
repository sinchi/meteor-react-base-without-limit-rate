import { composeWithTracker } from 'react-komposer';
import { Annonces } from '../../api/annonces/annonces.js';
import { AnnoncesList } from "../components/annonces-list.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const friends = Meteor.subscribe('conversations.friends');
	if(friends.ready()){
		console.log("conversation with friends is ready");
	}
	const subscriptions = Meteor.subscribe('annoncesWithRelation', params.text);
	let ready = true;
	if(subscriptions.ready()) {
		const annonces = Annonces.find({public: true}, { limit: params.limit, sort: { publication: -1 } }).fetch();
		ready = false;
		onData(null, { annonces, ready });
	}
};
export default composeWithTracker(composer, Loading)(AnnoncesList);
