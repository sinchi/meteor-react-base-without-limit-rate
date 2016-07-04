import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const add = () => {
  const title = getInputValue(component.refs.title);
  const description = getInputValue(component.refs.description);

  // Meteor.loginWithPassword(email, password, (error) => {
  //   if (error) {
  //     Bert.alert(error.reason, 'warning');
  //   } else {
  //     Bert.alert('Logged in!', 'success');
  //
  //     const { location } = component.props;
  //     if (location.state && location.state.nextPathname) {
  //       browserHistory.push(location.state.nextPathname);
  //     } else {
  //       browserHistory.push('/');
  //     }
  //   }
  // });
  console.log('title : ' + title);
  console.log('Description: ' + description);
};

const validate = () => {
  $(component.refs.addAnnonce).validate({
    rules: {
      title: {
        required: true
      },
      description: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'The title of the annonce is required here'
      },
      description: {
        required: 'Need a description here.',
      },
    },
    submitHandler() { add(); },
  });
};

export const handleAddAnnonce = (options) => {
  component = options.component;
  validate();
};
