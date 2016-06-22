import  React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Annonce } from './annonce.js';

export const AnnoncesList = ({ annonces }) => (
	annonces.length > 0 ? <ListGroup className="documents-list">
	 { annonces.map((annonce) => (
		<Annonce key={ annonce._id } annonce={ annonce } />
		)) }
	</ListGroup> : 
	<Alert bsStyle="warning">No annonces yet.</Alert>
);

AnnoncesList.propTypes = {
	annonces : React.PropTypes.array
};

