import React from 'react';
import { ListGroupItem, Row, Col, FormControl} from 'react-bootstrap';


export const Annonce = ({ annonce }) => (
	<ListGroupItem key={ annonce._id }>
		<Row>
			<Col xs={ 8 } sm={ 10 }>
				<FormControl
					type="text"
					standalone
					defaultValue={ annonce.title }
				/>
			</Col>
		</Row>
	</ListGroupItem>
);