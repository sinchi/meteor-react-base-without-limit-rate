import React, {Component} from 'react';
import { FormGroup, Radio, ControlLabel } from 'react-bootstrap';
import { Icon } from 'react-fa';
export class TypeAnnonce extends React.Component{

	render(){
		return  <FormGroup>
								<ControlLabel><Icon name="circle" size="lg" /> Type Annonce </ControlLabel>
					      <Radio name="typeAnnonce" ref="typeAnnonce"  value="offre">
					        Offre
					      </Radio>
					      <Radio name="typeAnnonce" ref="typeAnnonce" value="demande">
					        Demande
					      </Radio>
					 </FormGroup>
	}
}
