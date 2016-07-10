import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Row} from 'react-bootstrap';
import  {ModelsList}  from './models-list.js';
import { Carburant  } from './carburant.js';
import { AnneeModelMin  } from './annee-model-min.js';

export class BrandsList extends React.Component {

	constructor(){
		super(...arguments);
		this.state = {
			models: [{}]
		}
	}

	componentDidMount(){
		this.setState({ models: this.props.brands[0].models });
	}

	onBrandChange(event){

		let brand = this.props.brands.filter((brand) => {
			return brand.name == event.target.value;
		});

		this.setState({ models: brand[0].models });

	}

	render(){
		let brands = this.props.brands.map((brand) => {
			return <option key={ brand._id } value={brand.name}> { brand.name } </option>;
		});


		return (
					<FormGroup controlId="formControlsSelect">
				      <ControlLabel>Marques</ControlLabel>
				      <FormControl componentClass="select" placeholder="select" onChange={ this.onBrandChange.bind(this) }>
				        { brands }
				      </FormControl>
							{this.state.models !== undefined  ? <ModelsList models={ this.state.models } /> : ''}
							<Carburant />
							<AnneeModelMin />
				    </FormGroup>

				 )
	}
}
