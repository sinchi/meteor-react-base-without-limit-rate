import React from 'react';
import { FormGroup, FormControl, ControlLabel, Radio } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertAnnonce } from '../../api/annonces/methods.js';
import CitiesList from '../containers/cities-list.js';
import { handleAddAnnonce } from '../../modules/add-annonce.js';

export class AddAnnonce extends React.Component{


   handleInsertDocument(event) {
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
  }

  handleSubmit(event){
    event.preventDefault();
  }

  componentDidMount(){
    handleAddAnnonce({ component: this });
  }

  render(){
    return <form ref="addAnnonce" className="login" onSubmit={ this.handleSubmit.bind(this) }>
      <FormGroup>
        <FormControl
          type="text"
          onKeyUp={ this.handleInsertDocument.bind(this) }
          placeholder="Type a annonce title and press enter..."
          ref="title"
          name="title"
        />
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            name="description"
            ref="description"
            componentClass="textarea"
            placeholder="Description" />
        </FormGroup>
        <FormGroup>
          <Radio>
            Offre
          </Radio>
          <Radio>
            Demande
          </Radio>
        </FormGroup>
        <CitiesList />
      </FormGroup>
    </form>
  }
}
