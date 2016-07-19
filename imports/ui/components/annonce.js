import React from 'react';
import { ListGroupItem, Row, Col, FormControl, Thumbnail, Button} from 'react-bootstrap';


export const Annonce = ({ annonce }) => (
	<ListGroupItem key={ annonce._id }>
		<Row>
		<Col xs={6} md={4}>
		 <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
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
