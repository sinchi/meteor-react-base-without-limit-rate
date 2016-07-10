import React from 'react';
import { FormGroup, FormControl, ControlLabel , HelpBlock } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';

export class AddFile extends React.Component{

  render(){
    return (
      <FormGroup controlId="formControlsFile">
         <ControlLabel>Images: </ControlLabel>
         <FormControl type="file" name="image" ref="image" accept="image/*"/>
         <HelpBlock>Ajouter au moins une image</HelpBlock>
       </FormGroup>
    )
  }
}
