 import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';
import { updateStatus } from '../api/users/methods.js';

let component;

const login = () => {
  const email = getInputValue(component.refs.emailAddress);
  const password = getInputValue(component.refs.password);

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      updateStatus.call({userId: Meteor.userId(), status: true });
      Bert.alert('Nous sommes content de vous revoir ' + Meteor.user().profile.name.first + ' ' + Meteor.user().profile.name.last, 'success');
    //  console.log('Meteor.userId()', Meteor.userId());

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const validate = () => {
  $(component.refs.login).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'L\'address email est obligatoire',
        email: 'Cette adresse email n\'est pas correct',
      },
      password: {
        required: 'Le mot de passe est obligatoire',
      },
    },
    submitHandler() { login(); },
  });
};

export const handleLogin = (options) => {
  component = options.component;
  validate();
};
