import React from 'react';
import ReactDOM from 'react-dom';
import { ListGroupItem, Row, Col, FormControl, Thumbnail, Button, Link, ButtonToolbar,OverlayTrigger, DropdownButton, MenuItem, Tooltip} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Icon } from 'react-fa';
import { Message } from './message';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertMessage } from '../../api/messages/methods';


export class Annonce extends React.Component{

	constructor(){
    super(...arguments);
    this.state = {
      showModal: false,
			disabled: false,
			messageContent: ''
    }
  }

	componentDidMount(){
		if(this.props.annonce.owner === Meteor.userId())
				this.setState({ disabled: true });
	}

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

	 getPhoto(annonce){
		if(this.props.annonce.photos && this.props.annonce.photos.length > 0){
		//	console.log(this.props.annonce.photos[0]);
			return this.props.annonce.photos[0];
		}
	}

	 getUser(annonce){
		 const user = Meteor.users.findOne(annonce.owner);
		return user.profile.name.first + ' ' + user.profile.name.last;
		//return Meteor.user().profile.name.first;
	}

	voir(){
	 	browserHistory.push('/annonces/'+this.props.annonce._id);
	 //console.log('voir' + this.props.annonce._id);
 }

 getUserIcon(){
	 return <span><Icon name="user" size="lg" /> { this.getUser(this.props.annonce)}</span>
 }

 jaime(){
//	 console.log('jaime');
 }
 message(){
	  this.open();
 }
 comment(){
	// console.log('comment');
 }

messageText(event){
	this.setState({ messageContent: event.target.value });
}

 envoyer(event){
	 event.preventDefault();
	 const msg = {
		 sender: Meteor.userId(),
		 receiver: this.props.annonce.owner,
		 publication: new Date(),
		 read: false,
     content: this.state.messageContent
	 };

	 if(this.props.annonce.owner !== Meteor.userId())
	 		insertMessage.call(msg, (error) => {
			Bert.alert('Votre message a été envoyé à ' + this.getUser(this.props.annonce) + ' avec succée','success');
		 	this.close();
	 });

 }

	render(){
		const tooltipHeart = (
		  <Tooltip id="tooltip"><strong>Jaime!</strong>.</Tooltip>
		);
		const tooltipEye = (
			<Tooltip id="tooltip"><strong>Consulter cette annonce!</strong></Tooltip>
		);
		const tooltipEnvelope = (
			<Tooltip id="tooltip"><strong>Envoyer un message au annonceur!</strong></Tooltip>
		);
		const tooltipComment = (
			<Tooltip id="tooltip"><strong>Laisser un commentaire</strong></Tooltip>
		);
		return (

				<Row>
					<Col md={2}  mdOffset={1}>
						<ButtonToolbar>
							<DropdownButton title={ this.getUserIcon() } id="dropdown-size-medium">
								<MenuItem eventKey="1"><Icon name="users" size="lg" /> Suivre</MenuItem>
								<MenuItem eventKey="2" ><Icon name="envelope" size="lg" /> Message</MenuItem>
								<MenuItem eventKey="3"><Icon name="phone" size="lg" /> Appeler</MenuItem>
							</DropdownButton>
						</ButtonToolbar>
					</Col>
					<Col xs={12} md={6}>
								<Thumbnail src={ this.getPhoto(this.props.annonce) } alt={ this.props.annonce.title }>
									<h3>{ this.props.annonce.title }</h3>
									<p>{this.props.annonce.description}</p>

										<ButtonToolbar>
									    <OverlayTrigger placement="left" overlay={tooltipHeart}>
												<Button onClick={this.jaime.bind(this)}  bsStyle="default" bsSize="large"> <Icon name="heart-o" /> </Button>
									    </OverlayTrigger>
											<OverlayTrigger placement="top" overlay={tooltipEye}>
												<Button bsSize="large" onClick={this.voir.bind(this)} bsSize="large"  bsStyle="default"> <Icon name="eye" /> </Button>
									    </OverlayTrigger>
											<OverlayTrigger placement="bottom" overlay={tooltipEnvelope}>
												<Button disabled={ this.state.disabled } onClick={this.message.bind(this)} bsSize="large" bsStyle="default"><Icon name="envelope-o" /> </Button>
											</OverlayTrigger>
											<OverlayTrigger placement="right" overlay={tooltipComment}>
												<Button onClick={this.comment.bind(this)} bsSize="large" bsStyle="default"><Icon name="comment-o" /> </Button>
											</OverlayTrigger>
										</ButtonToolbar>


								</Thumbnail>

			 			</Col>
						<Message messageText={ this.messageText.bind(this) } showModal={ this.state.showModal } close={ this.close.bind(this) } envoyer={ this.envoyer.bind(this) }/>
				</Row>


		)
	}
}
