import  React from 'react';
import { ListGroup, Alert, Button, Col } from 'react-bootstrap';
import { Annonce } from './annonce.js';
import { Icon } from 'react-fa';
import { browserHistory } from 'react-router';

export class AnnoncesList extends React.Component{

	constructor(){
		super(...arguments);
		this.state = {
			isLoading: this.props.ready
		}
	}

	loadMore(event){
		event.preventDefault();
		this.setState({isLoading: true});
		//let { location } = this.props;
		//console.log("location", this.props.params.limit);
		browserHistory.push('/annonces/10');
		this.setState({ isLoading: false });
	}

	render(){
		let isLoading = this.state.isLoading;
		let annoncesList = _.map(this.props.annonces, (annonce) => {
			return <Annonce key={ annonce._id } annonce={ annonce } />
		});
		let status = (isLoading) ? <span><Icon name="spinner" size="lg" /> Chargement en cours</span> : <span><Icon name="refresh" size="lg" /> Charger plus </span>;
		return (

					<ListGroup>
						{ annoncesList }
						<Button bsStyle="primary" bsSize="large" block disabled={isLoading} onClick={!isLoading ? this.loadMore.bind(this) : null}>
        			{status}
						</Button>
					</ListGroup>


		)
	}
}
