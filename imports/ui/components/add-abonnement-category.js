import React from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Thumbnail, Col, Row } from 'react-bootstrap';
import  SelectCategoryForSubscription   from '../containers/select-category-for-subscription-container.js';
import { Categories } from '../../api/categories/categories.js';
import { Icon } from 'react-fa';

export class AddAbonnementCategory extends React.Component{

  constructor(){
    super(...arguments);
    this.state={
      electronique: "",
      vehicule:"",
      immobilier:"",
      maison:"",
      habillement:"",
      loisir:""
    }
  }

  componentDidMount(){
    console.log(this.state.electronique);
  }

  selectedCategory(event){
    let category = Categories.findOne({ name: event.target.value });

    switch (category.parent) {
      case "Electronique et Multimédia":
        this.setState({ electronique: event.target.value });
        break;
      case "Véhicules":
          this.setState({ vehicule: event.target.value });
          break;
      case "Immobilier":
          this.setState({ immobilier: event.target.value });
        break;
      case "Pour la maison et Jardin":
            this.setState({ maison: event.target.value });
        break;
      case "Habillement et bien etre":
          this.setState({ habillement: event.target.value });
        break;
      case "Loisirs et Divertissement":
          this.setState({ loisir: event.target.value });
        break;
    }
    //console.log(this.state.electronique);
  }

  render() {
    let popover = <Popover title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;

    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Choisir une catégorie que vous voulez s''abonner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
              <Col md={4}>
                  <Thumbnail src={ "informatique-et-multimedia.jpg" } alt={"ok"}>
                   <SelectCategoryForSubscription parent="Electronique et Multimédia" selectedCategory={this.selectedCategory.bind(this)}/>
                   <p>
                    <Button target={ this.state.electronique } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
              <Col md={4}>
                 <Thumbnail src={"vehicules.jpg"} alt={ "ok" }>
                 <SelectCategoryForSubscription parent="Véhicules" selectedCategory={this.selectedCategory.bind(this)}/>
                   <p>
                     <Button target={ this.state.vehicule }  bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
              <Col md={4}>
                 <Thumbnail src={ "immobilier.jpg" } alt={ "ok" }>
                 <SelectCategoryForSubscription parent="Immobilier" selectedCategory={this.selectedCategory.bind(this)}/>
                   <p>
                     <Button target={ this.state.immobilier } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                 <Thumbnail src={ "maison-et-jardin.jpg" } alt={ "ok" }>
                   <p>
                   <SelectCategoryForSubscription parent="Pour la maison et Jardin" selectedCategory={this.selectedCategory.bind(this)}/>
                     <Button target={ this.state.maison } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
               </Col>
              <Col md={4}>
               <Thumbnail src={ "habillement-et-bien-etre.jpg" } alt={ "ok" }>
                  <SelectCategoryForSubscription parent="Habillement et bien etre" selectedCategory={this.selectedCategory.bind(this)}/>
                 <p>
                   <Button target={ this.state.habillement } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                 </p>
               </Thumbnail>
            </Col>
            <Col md={4}>
               <Thumbnail src={ "loisirs.jpg" } alt={ "ok" }>
                 <SelectCategoryForSubscription parent="Loisirs et Divertissement" selectedCategory={this.selectedCategory.bind(this)}/>
                 <p>
                   <Button target={ this.state.loisir } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                 </p>
               </Thumbnail>
             </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
