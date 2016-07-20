import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const getUserData = () => ({
  email: getInputValue(component.refs.emailAddress),
  password: getInputValue(component.refs.password),
  profile: {
    name: {
      first: getInputValue(component.refs.firstName),
      last: getInputValue(component.refs.lastName),
      // type: professionnel | particulier,
      // telephone: numero de son téléphone,
      // adresse: adresse d'annonceur
    },
  },
});

const signUp = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Bienvenue avec nous sur Annoncio !', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      // type:{
      //   required: true
      // },
      // telephone:{
      //   required: false
      // },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      firstName: {
        required: 'Prénom ?',
      },
      lastName: {
        required: 'Nom?',
      },
      emailAddress: {
        required: 'Email est obligatoire',
        email: 'Email saisi n\'est pas correct',
      },
      password: {
        required: 'Mot de passe est obligatoire.',
        minlength: 'Saisir 6 caractéres au minimum, s\'il vous plaît.',
      },
    },
    submitHandler() { signUp(); },
  });
};

export const handleSignup = (options) => {
  component = options.component;
  validate();
};
