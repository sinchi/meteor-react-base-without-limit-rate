import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import {Icon} from 'react-fa'


const handleLogout = () => Meteor.logout( () => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  //return user ? '${name.first} ${name.last}' : '';
   return user ? <span><i className="fa fa-user fa-lg"></i> {`${name.first} ${name.last}`} </span>    : '';
}


export const AuthenticatedNavigation = () => (

  <div>
    <Nav>
    {/*  <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/"><Icon size='lg' name="home" /> Accueil</NavItem>
      </IndexLinkContainer>

          <LinkContainer to="/documents">
           <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
         </LinkContainer>
      */}
      <LinkContainer to="/annonces">
        <NavItem eventKey={ 1 } href="/annonces"><Icon size='lg' name="home"/> Accueil <Badge pullRight> 4</Badge></NavItem>
      </LinkContainer>
      <NavDropdown
        eventKey={ 2 }
        title={  <span><i className="fa fa-bullhorn fa-lg"></i> Abonnement <Badge pullRight> 18</Badge></span> }
        id="basic-nav-dropdown">
        <MenuItem eventKey={ 2.1 }><Icon name="plus-circle" size="lg" /> Abonner à une catégorie</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={ 3.1 }><Icon name="mobile-phone" size="lg" /> Téléphones <Badge pullRight> 15</Badge></MenuItem>
        <MenuItem divider />
      <MenuItem eventKey={ 3.2 }><Icon name="car" size="lg" /> Véhicules <Badge pullRight> 3</Badge></MenuItem>

     </NavDropdown>
     <LinkContainer to="/my-annonces">
       <NavItem eventKey={ 3 } href="/annonces"><Icon size='lg' name="hand-grab-o"/> Mes annonces</NavItem>
     </LinkContainer>
    </Nav>
    <Nav pullRight>
    <LinkContainer to="/add-annonce">
      <NavItem eventKey = { 4 } href="/add-annonce"><Icon name="flash" size="lg" /> Publier une annonce</NavItem>
    </LinkContainer>
       <NavDropdown eventKey={ 5 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 5.1 } onClick={ handleLogout }>Déconnexion</MenuItem>
      </NavDropdown>
    </Nav>
  </div>

);
