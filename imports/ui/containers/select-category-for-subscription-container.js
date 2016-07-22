import { composeWithTracker } from 'react-komposer';
import { Categories } from '../../api/categories/categories.js';
import { SelectCategoryForSubscription } from "../components/select-category-for-subscription.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {	
	const subscriptions = Meteor.subscribe('categories');
	if(subscriptions.ready()) {
		const categories = Categories.find({ parent: params.parent }).fetch();
		onData(null, { categories });
	}
};
export default composeWithTracker(composer, Loading)(SelectCategoryForSubscription);
