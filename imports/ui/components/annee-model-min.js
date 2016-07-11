import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
export class AnneeModelMin extends Component{

	constructor(){
		super(...arguments);
	}

	render(){

		let annees = () => {
			let options ;
			for(let i=0; i<36; i++){
					options[i] =  <option key={ i } value={ 1980+i }>{ 1980 + i }</option>;
				}
		};

		return 	<FormGroup controlId="formControlsSelect">
			      <ControlLabel>Année Model Min</ControlLabel>
			      <FormControl name="yearOfModel" ref="yearOfModel" componentClass="select" placeholder="select" onChange={ this.props.onCityChange }>

			      </FormControl>
			    </FormGroup>
	}
}
