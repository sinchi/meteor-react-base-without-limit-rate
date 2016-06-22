import { composeWithTracker } from 'react-komposer';
import { Categories } from '../../api/categories/categories.js';
import { CategoriesList } from "../components/categories-list.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {	
	const subscriptions = Meteor.subscribe('categories');
	if(subscriptions.ready()) {
		const categories = Categories.find().fetch();
		onData(null, { categories });
	}

};
export default composeWithTracker(composer, Loading)(CategoriesList);
