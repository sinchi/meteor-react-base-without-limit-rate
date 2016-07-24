import { composeWithTracker } from 'react-komposer';
import { AbonnementCategory } from '../../api/annonces/abonnements/abonnement-category.js';
import { Categories } from '../../api/categories/categories.js';
import { DropDownAbonnement } from "../components/drop-down-abonnement.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
	const subscriptions = Meteor.subscribe('abonnement-category');
	if(subscriptions.ready()) {
		const abonnements = AbonnementCategory.find();
		console.log(abonnements.length);
  let categories =  abonnements.map((abonnement) => {
		if(abonnement){
      console.log(abonnement);
      return Categories.findOne( abonnement.categoryId );
    }

    });
		 console.log(categories);
		onData(null, { categories });
	}
};
export default composeWithTracker(composer, Loading)(DropDownAbonnement);
