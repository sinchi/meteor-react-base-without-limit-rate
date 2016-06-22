import { composeWithTracker } from 'react-komposer';
import { Brands } from '../../api/brands/brands.js';
import { BrandsList } from "../components/brands-list.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {	
	const subscriptions = Meteor.subscribe('brands');
	if(subscriptions.ready()) {
		const brands = Brands.find().fetch();
		onData(null, { brands });
	}
};
export default composeWithTracker(composer, Loading)(BrandsList);
