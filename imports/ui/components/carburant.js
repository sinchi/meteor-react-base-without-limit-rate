import React, { Component } from 'react'; 	
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
export class Carburant extends Component{

	constructor(){
		super(...arguments);
	}

	render(){
		
		return 	<FormGroup controlId="formControlsSelect">
			      <ControlLabel>Carburants</ControlLabel>
			      <FormControl componentClass="select" placeholder="select" onChange={ this.props.onCityChange }>
			        <option key="Diesel" value="Diesel">Diesel</option>
			        <option key="Essence" value="Essence">Essence</option>
			        <option key="Electrique" value="Electrique">Electrique</option>
			        <option key="LPG" value="LPG">LPG</option>
			      </FormControl>
			    </FormGroup>
	}
}