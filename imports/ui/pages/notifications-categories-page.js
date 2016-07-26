import React from 'react';
import { Annonce } from '../components/annonce';
import { AnnoncesList } from '../components/annonces-list';

export class NotificationsCategoriesPage extends React.Component{

  render(){

    return <AnnoncesList annonces={ this.props.annonces }/>
  }
}
