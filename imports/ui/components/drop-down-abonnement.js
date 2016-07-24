import React from 'react';

import {   NavDropdown,MenuItem, Badge } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class DropDownAbonnement extends React.Component{

  render(){

    let menuItems = this.props.categories.map((category) => {
        return <MenuItem eventKey={ category.name }><Icon name="bell" size="lg" pullLeft/> { category.name } </MenuItem>;
    });


    return (
      <NavDropdown
        eventKey={ 2 }
        title={  <span><i className="fa fa-bullhorn fa-lg"></i> Abonnement</span> }
        id="basic-nav-dropdown">
        <MenuItem eventKey={ 2.1 } onClick={ this.props.open }><Icon name="plus-circle" size="lg" /> Abonner à une catégorie</MenuItem>
        <MenuItem divider />
        { menuItems }
     </NavDropdown>

    )
  }
}
