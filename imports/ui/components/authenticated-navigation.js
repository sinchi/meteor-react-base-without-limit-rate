import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import {Icon} from 'react-fa';
import { AddAbonnementCategory } from './add-abonnement-category.js';
import { Categories } from '../../api/categories/categories.js';
import { insertAbonnementCategory } from '../../api/annonces/abonnements/methods.js';
import { Bert } from 'meteor/themeteorchef:bert';
import DropDownAbonnement from '../containers/drop-down-abonnement-container.js';

export class AuthenticatedNavigation extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      showModal: false
    }
  }

  open(){
    this.setState({ showModal: true });
  }

  close(){
    this.setState({ showModal: false });
  }

  abonner(event){
     let category = event.target.target;
     let categoryData = Categories.findOne({ name: category });
      console.log(category);
     let abonnementCategory = {
       userId: Meteor.userId(),
       categoryId: categoryData._id
     };

     insertAbonnementCategory.call({
        userId: Meteor.userId(),
        categoryId: categoryData._id
    }, (error) => {
      if(error){
        console.log(error);
        Bert.alert(error.reason, 'danger');
      }else{
          Bert.alert('Vous êtes abonné à la catégorie: ' + categoryData.name, "success");
        }
    });

  }

  render(){
    const userName = () => {
      const user = Meteor.user();
      const name = user && user.profile ? user.profile.name : '';
      //return user ? '${name.first} ${name.last}' : '';
       return user ? <span><i className="fa fa-user fa-lg"></i> {`${name.first} ${name.last}`} </span>    : '';
    }

    const handleLogout = () => Meteor.logout( () => browserHistory.push('/login'));

    return (

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
          <DropDownAbonnement open={ this.open.bind(this) }/>
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
        <AddAbonnementCategory abonner={ this.abonner.bind(this) } close={ this.close.bind(this) } showModal={ this.state.showModal }/>
      </div>


    )
  }
}
