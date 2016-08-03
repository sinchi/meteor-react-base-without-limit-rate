import React from 'react';
import { Annonce } from '../components/annonce';
import { AnnoncesList } from '../components/annonces-list';
import { Col } from 'react-bootstrap';

export class NotificationsCategoriesPage extends React.Component{

  render(){

    return <Col md={ 9 } mdOffset={3} xs={ 12 }>
              <AnnoncesList annonces={ this.props.annonces }/>
            </Col>
  }
}
