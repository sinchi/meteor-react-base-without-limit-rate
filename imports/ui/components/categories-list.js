import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class CategoriesList extends Component{

	constructor(){
		super(...arguments);
	}

	render(){
		let parents = this.props.categories.filter((parent) => { return !_.has(parent, 'parent') });
		let children = this.props.categories.filter((child) => { return _.has(child, 'parent') });
		let categories = parents.map((parent) => {
			return <optgroup key={ parent._id } label={ parent.name }>
						{ children.map((child) => {
							return child.parent === parent.name ?
							<option key={ child._id } value={ child.name }>{ child.name }</option>
							: "";
						}) }
					</optgroup>
		})
		return 	<FormGroup controlId="formControlsSelect">
				      <ControlLabel>Catégorie: </ControlLabel>
				      <FormControl name="category" ref="category" componentClass="select" placeholder="select" onChange={ this.props.onCategoryChange }>
				        { categories }
				      </FormControl>
				    </FormGroup>
	}
}
