import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../api/cities/cities.js';
import { CitiesList } from "../components/cities-list.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('cities');
	if(subscriptions.ready()) {
		const cities = Cities.find().fetch();		
		onData(null, { cities });
	}	
};	
export default composeWithTracker(composer, Loading)(CitiesList);
