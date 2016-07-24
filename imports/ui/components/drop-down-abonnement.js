import React from 'react';

import {   NavDropdown,MenuItem, Badge } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class DropDownAbonnement extends React.Component{

  render(){
    let eventKey = 2;
    let items = this.props.categories.map((category) => {
      eventKey++;      
        return <MenuItem eventKey={ "2."+eventKey }><Icon name="bell" size="lg" pullLeft/> { category.name } </MenuItem>;
    });

    let menuItems = (this.props.categories && this.props.categories.length > 0) ? items : (<MenuItem eventKey={ 2.2 } > Vous n êtes abonné à aucune catégorie !</MenuItem>);

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
