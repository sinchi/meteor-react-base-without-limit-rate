import  React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class ModelsList extends React.Component {

	componentDidMount(){
		console.log(this.props.models);
	}

	render(){
		let models =  this.props.models.map((model) => {
			return <option key={ model.name } value={ model.name }> { model.name } </option>
		});

		return 	  <FormGroup controlId="formControlsSelect">
				      <ControlLabel>Models</ControlLabel>
				      <FormControl name="model" ref="model" componentClass="select" placeholder="select">
				        { models }
				      </FormControl>
				    </FormGroup>;

	}
}
