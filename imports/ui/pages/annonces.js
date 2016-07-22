import React from 'react';
import { Row, Col , FormGroup , ControlLabel, FormControl} from 'react-bootstrap';
import AnnoncesList from '../containers/annonces-list.js';
import CitiesList from '../containers/cities-list.js';
import CategoriesList from '../containers/categories-list.js';
import BrandsList from '../containers/brands-list.js';

import { Search } from '../components/search.js';
import { TypeAnnonce  } from '../components/type-annonce.js';



export class Annonces extends React.Component{

	constructor(){
		super(...arguments);
		this.state = {
			text: "",
			value: "",
			category: ""
		}
	}

	handleSearch(event){
		let val = event.target.value.trim();
		this.setState({ text: val });
	}

	onCityChange(event){
		console.log(event.target.value);
	}

	onCategoryChange(event){
		this.setState({ category: event.target.value });

	}

	getValidationState() {
	    const length = this.state.value.length;
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else if (length > 0) return 'error';
	  }

	  handleChange(event){
	  	this.setState({ value: event.target.value.trim() });
	  }

	render(){
		return (
			<Row>
				<h4 className="page-header">Annonces</h4>
			    <Col xs={ 12 } md={ 3 }>
			      <CitiesList onCityChange={ this.onCityChange }/>
			      <CategoriesList onCategoryChange={ this.onCategoryChange.bind(this) }/>
			      <TypeAnnonce />
			      <FormGroup controlId="formControlsText" validationState={this.getValidationState()} >
				      <ControlLabel>Prix Min</ControlLabel>
				      <FormControl type="text" placeholder="Enter Prix Min" onChange={ this.handleChange.bind(this) }/>
				   </FormGroup>
				   <FormGroup controlId="formControlsText">
				      <ControlLabel>Prix Max</ControlLabel>
				      <FormControl type="text" placeholder="Enter Prix Max" />
				   </FormGroup>
				  { this.state.category === "Voitures" ?  <BrandsList /> : '' }

			      <Search text={ this.state.text } handleSearch={ this.handleSearch.bind(this) } />

			      {/* <AnnoncesList text={ this.state.text } /> */}
			    </Col>
			    <Col md={ 9 }>
			    	<AnnoncesList text={ this.state.text } />
			    </Col>
			  </Row>

			  );
	}
}
