import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import {Icon} from 'react-fa';
import { AddAbonnementCategory } from './add-abonnement-category.js';
import { Categories } from '../../api/categories/categories.js';
import { insertAbonnementCategory } from '../../api/annonces/abonnements/methods.js';
import { updateToReadNotificationNewAnnonce } from '../../api/annonces/notifications/methods.js';
import { Bert } from 'meteor/themeteorchef:bert';
import DropDownAbonnement from '../containers/drop-down-abonnement-container.js';
import DropDownMessagesComponent from '../containers/messages/friends-list-navigation-container.js';

import { updateStatus } from '../../api/users/methods.js';

export class AuthenticatedNavigation extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      showModal: false
    }
  }

  componentDidMount(){
    console.log('im the navigator up ' + Meteor.userId());
  }

  componentWillUnmount(){
    window.addEventListener("beforeunload", (ev) =>
    {
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
  }

  open(){
    this.setState({ showModal: true });
  }

  close(){
    this.setState({ showModal: false });
  }

  makeRead(eventKey, event){
    updateToReadNotificationNewAnnonce.call({categoryId:eventKey});
    browserHistory.push('/annonces/categories/' + eventKey);
    //console.log(eventKey);
  }

  abonner(event){
     let category = event.target.target;
     let categoryData = Categories.findOne({ name: category });
    //  console.log(category);
     let abonnementCategory = {
       userId: Meteor.userId(),
       categoryId: categoryData._id
     };

     insertAbonnementCategory.call({
        userId: Meteor.userId(),
        categoryId: categoryData._id
    }, (error) => {
      if(error){
      //  console.log(error);
        Bert.alert(error.reason, 'danger');
      }else{
          Bert.alert('Vous êtes abonné à la catégorie: ' + categoryData.name, "success");
        }
    });

  }

  handleLogout(){

    let userStatus = { userId: Meteor.userId(), status: false };
    updateStatus.call(userStatus);

    Meteor.logout( (error) => {
      if(!error){

        browserHistory.push('/login');
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
            <NavItem eventKey={ 1 } href="/annonces"><Icon size='lg' name="home"/> Accueil </NavItem>
          </LinkContainer>
          <DropDownAbonnement makeRead={ this.makeRead.bind(this) } open={ this.open.bind(this) }/>
         <LinkContainer to="/my-annonces">
           <NavItem eventKey={ 3 } href="/annonces"><Icon size='lg' name="bullhorn"/> Mes annonces</NavItem>
         </LinkContainer>
         <DropDownMessagesComponent />
        {/* <LinkContainer to="/messages">
           <NavItem eventKey={ 4 } href="/messages"><Icon size='lg' name="envelope-o"/> Messages</NavItem>
         </LinkContainer>*/}
         <LinkContainer to="/discussion">
           <NavItem eventKey={ 4 } href="/discussion"><Icon size='lg' name="comments-o"/> Discussions</NavItem>
         </LinkContainer>
        </Nav>
        <Nav pullRight>
        <LinkContainer to="/add-annonce">
          <NavItem eventKey = { 4 } href="/add-annonce"><Icon name="flash" size="lg" /> Publier une annonce</NavItem>
        </LinkContainer>
           <NavDropdown eventKey={ 5 } title={ userName() } id="basic-nav-dropdown">
            <MenuItem eventKey={ 5.1 } onClick={ this.handleLogout.bind(this) }>Déconnexion</MenuItem>
          </NavDropdown>
        </Nav>
        <AddAbonnementCategory abonner={ this.abonner.bind(this) } close={ this.close.bind(this) } showModal={ this.state.showModal }/>
      </div>


    )
  }
}
