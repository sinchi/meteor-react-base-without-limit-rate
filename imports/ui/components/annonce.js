import React from 'react';
import { ListGroupItem, Row, Col, FormControl, Thumbnail, Button} from 'react-bootstrap';
import { Icon } from 'react-fa';

function getPhoto(annonce){
	if(annonce.photos && annonce.photos.length > 0){
		console.log(annonce.photos[0]);
		return annonce.photos[0];
	}
}

function getUser(annonce){
	//return Meteor.users.findOne(annonce.owner);
	return Meteor.user().profile.name.first;
}

export const Annonce = ({ annonce }) => (
	<ListGroupItem key={ annonce._id }>
		<Row>
		{/*<Col md={ 1 } xsOffset={ 1 }>
			<Icon name="user" size="lg" /> { Meteor.user().profile.name.first }
		</Col>*/}
		<Col xs={6} md={8} xsOffset={2}>
			<Icon name="user" size="lg" /> { Meteor.user().profile.name.first}

		 <Thumbnail src={ getPhoto(annonce) } alt={ annonce.title }>
			 <h3>{ annonce.title }</h3>
			 <p>{annonce.description}</p>
			 <p>
				 <Button bsStyle="primary"> <Icon name="eye" size="lg" /> Voir</Button>&nbsp;
				 <Button bsStyle="info"><Icon name="comments" size="lg" /> Commenter</Button>&nbsp;
				 <Button bsStyle="warning"><Icon name="send" size="lg" /> Tchater</Button>
			 </p>
		 </Thumbnail>
	 </Col>
		</Row>
	</ListGroupItem>
);
