import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Cities } from  '../../api/cities/cities.js';
import { Sequence } from "../../api/sequences/sequence.js";
const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});

Meteor.startup(() => {
  if(Sequence.find().count() === 0){
    Sequence.insert({ _id: "messages", seq:1 });
  }
  if(Cities.find().count() === 0){
	Cities.insert({
  	name: 'Casablanca'
  });
  Cities.insert({
  	name: 'Tanger'
  });
  Cities.insert({
  	name: 'Agadir'
  });

  Cities.insert({
  	name: 'Fes'
  });

  Cities.insert({
  	name: 'Marrakech'
  });

  Cities.insert({
  	name: 'El jadida'
  });

  Cities.insert({
  	name: 'Rabat'
  });
}

})
