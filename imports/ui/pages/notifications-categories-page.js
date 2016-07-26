import React from 'react';
import { Annonce } from '../components/annonce';

export class NotificationsCategoriesPage extends React.Component{

  render(){

    return <div>{this.props.params.categoryId}</div>
  }
}
