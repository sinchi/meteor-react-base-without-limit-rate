import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertAnnonce } from '../../api/annonces/methods.js';
import { TypeAnnonce } from '../components/type-annonce.js';
import  BrandsList  from '../containers/brands-list.js';
import  CategoriesList  from '../containers/categories-list.js';
import  CitiesList  from '../containers/cities-list.js';
import { handleAddAnnonce } from '../../modules/add-annonce.js';
import { AddFile } from '../components/add-file.js';

export class AddAnnonce extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      category : ""
    }
  }


  componentDidMount(){
    handleAddAnnonce({ component: this });
  }

  handleSubmitForm(event){
    event.preventDefault();
  }

  onCategoryChange(event){
    this.setState({ category: event.target.value });
  }

  render(){
    return (
      <Col xs={12} md={3}>
      <form ref="addAnnonce" name="addAnnonce" onSubmit={ this.handleSubmitForm.bind(this) }>
        <CategoriesList onCategoryChange={ this.onCategoryChange.bind(this) }/>
        <CitiesList />
        <FormGroup>
         <ControlLabel>Titre</ControlLabel>
          <FormControl
            type="text"
            placeholder="Titre d'annonce"
            ref="title"
            name="title"
          />
        </FormGroup>
          <FormGroup controlId="formControlsTextarea">
           <ControlLabel>Description</ControlLabel>
           <FormControl
              componentClass="textarea"
              placeholder="Description"
              ref="description"
              name="description" />
            </FormGroup>
            <FormGroup>
             <ControlLabel>Prix:</ControlLabel>
              <FormControl
                type="text"
                placeholder="Prix d'annonce"
                ref="price"
                name="price"
              />
            </FormGroup>
          <TypeAnnonce />
        { this.state.category === "Voitures" ?  <BrandsList /> : '' }
         <AddFile /> 

        <input type="submit" value="add annonce" />
      </form>
      </Col>
    );
  }


}
