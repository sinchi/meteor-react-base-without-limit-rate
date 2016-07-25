import React from 'react';

import {   NavDropdown,MenuItem, Badge } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class DropDownAbonnement extends React.Component{

  getCategoryNotification(category){
    if(category && category.count && category.count > 0)
      if(category.count > 23)
        return <Badge pullRight>+23</Badge>
      else
        return <Badge pullRight>{category.count}</Badge>
  }
  getIconNotification(category){
    if(category && category.count && category.count > 0)
        return "bell";

    return "bell-o"
  }

  getTotalCategoriesCount(){
    let count = 0;
    if(this.props.categories)
      for(let i=0; i<this.props.categories.length; i++)
        if(this.props.categories[i] && this.props.categories[i].count)
          count += this.props.categories[i].count

      if(count > 0)
        if(count > 23)
          return <Badge pullRight>+23</Badge>
        else
          return <Badge pullRight>{count}</Badge>
  }

  getActive(category){
    if(category && category.active)
      return category.active;

    return false;
  }



  render(){
    let eventKey = 2;
    let items = this.props.categories.map((category) => {
      eventKey++;
        return <MenuItem onSelect={this.props.makeRead}  eventKey={ category._id }><Icon name={ this.getIconNotification(category) } size="lg" pullLeft/> { category.name } {this.getCategoryNotification(category)}</MenuItem>;
    });

    let menuItems = (this.props.categories && this.props.categories.length > 0) ? items : (<MenuItem eventKey={ 2.2 } > Vous n êtes abonné à aucune catégorie !</MenuItem>);

    return (
      <NavDropdown
        eventKey={ 2 }
        title={  <span><i className="fa fa-bullhorn fa-lg"></i> Abonnement { this.getTotalCategoriesCount() }</span> }
        id="basic-nav-dropdown">
        <MenuItem eventKey={ 2.1 } onClick={ this.props.open }><Icon name="plus-circle" size="lg" /> Abonner à une catégorie </MenuItem>
        <MenuItem divider />
        { menuItems }
     </NavDropdown>

    )
  }
}
