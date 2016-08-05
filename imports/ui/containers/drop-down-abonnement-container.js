import { composeWithTracker } from 'react-komposer';
import { AbonnementCategory } from '../../api/annonces/abonnements/abonnement-category.js';
import { Categories } from '../../api/categories/categories.js';
import { NotificationAnnonce } from '../../api/annonces/notifications/notification-annonce.js';
import { Annonces } from '../../api/annonces/annonces.js';
import { DropDownAbonnement } from "../components/drop-down-abonnement.js";
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';
//import { underscore } from 'meteor/underscore';

const getCategory = (annonceId) => {
	let annonce = Annonces.findOne(annonceId);
	let category = Categories.findOne({ name: annonce.category.name });
	return category;
}

const exist = (tab, name) => {
	for(let i=0; i< tab.length; i++){
		if(tab[i].name === name)
			return true;
	}
	return false;
}

const getCountCategoryGroup = (notifications) => {
	let k=0;
	let group = [];
	for(let i=0; i<notifications.length; i++){
		for(let j=0; j<notifications.length; j++){
			if(notifications[i]._id === notifications[j]._id)
				k++;
		}
		if(!exist(group, notifications[i].name))
			group.push({_id: notifications[i]._id,  name: notifications[i].name, count: k });

		k=0;
	}

	return group;
}


const getCountCategory = (categories, id) => {
	let j = 0;
	for(let i=0; i<categories.length; i++){
		if(categories[i].category === id)
			j++;
	}
	return j;
}

const composer = (params, onData) => {
	const subSequence = Meteor.subscribe('sequences', 'messages');
	const subscriptions = Meteor.subscribe('abonnement-category');
	const notificationAnnonceSubscription = Meteor.subscribe('notification-annonce');
	if(subscriptions.ready() && notificationAnnonceSubscription.ready()) {

		const abonnements = AbonnementCategory.find({userId: Meteor.userId()});
		const notifications = NotificationAnnonce.find({ userId: Meteor.userId() });
	//	console.log(notifications);
		let categoriesNotification = notifications.map((notification) => {
			return 	Categories.findOne(notification.category);
		});
	//	console.log(categoriesNotification);
	let notificationsGroupByCategory = getCountCategoryGroup(categoriesNotification);

//	console.log(notificationsGroupByCategory);

  let categories =  abonnements.map((abonnement) => {
	      let category =  Categories.findOne( abonnement.categoryId );
				for(let i=0; i<notificationsGroupByCategory.length; i++){
					if(category._id === notificationsGroupByCategory[i]._id){
						category.count = notificationsGroupByCategory[i].count;
						category.active = true;
					}
				}
				return category;
    });

	//	console.log(counts);
	//	console.log(categories);
		onData(null, { categories });
	}
};
export default composeWithTracker(composer, Loading)(DropDownAbonnement);
