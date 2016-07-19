import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class CitiesList extends Component{

	constructor(){
		super(...arguments);
	}

	render(){
		let cities = this.props.cities.map((city) => {
			return <option key={ city._id } value={ city.name }>{ city.name }</option>
		});
		return 	<FormGroup controlId="formControlsSelect">
			      <ControlLabel><Icon name="globe" size="lg" /> Ville:</ControlLabel>
			      <FormControl name="city" ref="city" componentClass="select" placeholder="select" onChange={ this.props.onCityChange }>
			        { cities }
			      </FormControl>
			    </FormGroup>
	}
}
