import React from 'react';
 import { Row, Col , FormGroup , ControlLabel, FormControl} from 'react-bootstrap';
 import AnnoncesList from '../containers/my-annonces.js';
// import CitiesList from '../containers/cities-list.js';
// import CategoriesList from '../containers/categories-list.js';
// import BrandsList from '../containers/brands-list.js';

// import { Search } from '../components/search.js';
// import { TypeAnnonce  } from '../components/type-annonce.js';
import MyAnnoncesPage from '../containers/my-annonces.js';

export class MyAnnonces extends React.Component{

  constructor(){
    super(...arguments);
  }

  render(){
    return (
          <Col md={ 9 }>
          <AnnoncesList />
        </Col>
      )
  }
}
