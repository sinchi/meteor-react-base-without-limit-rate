import React, { Component, PropTypes, defaultProps } from 'react';


export class Search extends Component{

	componentDidMount(){
		console.log('initial State : ' + this.state.category);
	}

	constructor(){
		super(...arguments);
		this.state = {
			category: "Select category"
		}
	}


	handleFormSubmit(event){
		event.preventDefault();
		console.log('onSubmitForm');
	}

	changeCategory(event){
		this.setState({ category: event.target.value });
		console.log('category changed ' + this.state.category);
	}

	render(){
		return (
				<form onSubmit={ this.handleFormSubmit.bind(this) }>					
					<input type="text" value={ this.props.text } onChange={ this.props.handleSearch.bind(this) } />					
				</form>
				
			);
	}

}

Search.defaultProps = {
	text: ""
}

Search.propTypes = {
		text : PropTypes.string,
		handleSearch: PropTypes.func.isRequired
	}