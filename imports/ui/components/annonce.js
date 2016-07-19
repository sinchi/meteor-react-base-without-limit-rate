import React from 'react';
import { ListGroupItem, Row, Col, FormControl, Thumbnail, Button} from 'react-bootstrap';

function getPhoto(annonce){
	if(annonce.photos && annonce.photos.length > 0){
		console.log(annonce.photos[0]);
		return annonce.photos[0];
	}

}

export const Annonce = ({ annonce }) => (
	<ListGroupItem key={ annonce._id }>
		<Row>
		<Col xs={6} md={4}>
		 <Thumbnail src={ getPhoto(annonce) } alt="242x200">
			 <h3>{ annonce.title }</h3>
			 <p>{annonce.description}</p>
			 <p>
				 <Button bsStyle="primary">Voir</Button>&nbsp;
				 <Button bsStyle="default">Vues</Button>
			 </p>
		 </Thumbnail>
	 </Col>
		</Row>
	</ListGroupItem>
);
