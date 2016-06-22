import React, {Component} from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

export class TypeAnnonce extends React.Component{

	render(){
		return  <FormGroup>
					      <Radio name="typeAnnonce" id="offre" >
					        Offre
					      </Radio>					      
					      <Radio name="typeAnnonce" id="demande">
					        Demande
					      </Radio>					     
					 </FormGroup>				
	}
}