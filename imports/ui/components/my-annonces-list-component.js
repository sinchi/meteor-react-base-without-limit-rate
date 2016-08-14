import  React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Annonce } from './annonce.js';

export class MyAnnoncesListComponent extends React.Component{
  render(){
    let listGroup =  _.map(this.props.annonces, (annonce) => {
      return  <Annonce key={ annonce._id } annonce={ annonce } />
    });

    return (
        <ListGroup>
          { listGroup }
        </ListGroup>
    )
  }
}
