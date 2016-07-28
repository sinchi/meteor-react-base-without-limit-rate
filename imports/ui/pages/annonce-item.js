import React from 'react';
import { ListGroupItem, Row, Col, FormControl, Thumbnail, Button, Link} from 'react-bootstrap';
import { Annonces } from '../../api/annonces/annonces.js';
import { Annonce } from '../components/annonce.js';
import { Icon } from 'react-fa';

export class AnnonceItem extends React.Component{

	getPhoto(annonce){
	 if(this.props.annonce.photos && this.props.annonce.photos.length > 0){
		 console.log(this.props.annonce.photos[0]);
		 return this.props.annonce.photos[0];
	 }
 }

	getUser(annonce){
	 return Meteor.users.findOne(annonce.owner);
	 //return Meteor.user().profile.name.first;
 }

	render(){
		return (
			<ListGroupItem key={ this.props.annonce._id }>
				<Row>
				{/*<Col md={ 1 } xsOffset={ 1 }>
					<Icon name="user" size="lg" /> { Meteor.user().profile.name.first }
				</Col>*/}
				<Col xs={6} md={8} xsOffset={2}>
					<Icon name="user" size="lg" /> { this.getUser(this.props.annonce).profile.name.first}

				 <Thumbnail src={ this.getPhoto(this.props.annonce) } alt={ this.props.annonce.title }>
					 <h3>{ this.props.annonce.title }</h3>
					 <p>{this.props.annonce.description}</p>
					 <p>
						
						 <Button bsStyle="info"><Icon name="comments" size="lg" /> Commenter</Button>&nbsp;
						 <Button bsStyle="warning"><Icon name="send" size="lg" /> Tchater</Button>
					 </p>

				 </Thumbnail>
			 </Col>
				</Row>
			</ListGroupItem>
		)
	}
}
