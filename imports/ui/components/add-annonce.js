import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertAnnonce } from '../../api/annonces/methods.js';

const handleInsertDocument = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    insertAnnonce.call({
      title,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Document added!', 'success');
      }
    });
  }
};

export const AddAnnonce = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertDocument }
      placeholder="Type a annonce title and press enter..."
    />
  </FormGroup>
);
