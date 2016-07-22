import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class SelectCategoryForSubscription extends React.Component{

  render(){
    let children = this.props.categories.map((category) => {
      return <option key={ category._id } name={ category.name }>{ category.name }</option>
    });
    return (

      <FormGroup controlId="formControlsSelect">
             <ControlLabel>{ this.props.parent }</ControlLabel>
             <FormControl onChange={this.props.selectedCategory} ref="category-abonnement" name="category-abonnement" componentClass="select" placeholder="select" >
               { children }
             </FormControl>
           </FormGroup>
    )
  }
}
