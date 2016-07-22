import React from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Thumbnail, Col, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class AddAbonnementCategory extends React.Component{

  constructor(){
    super(...arguments);
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
                   <h3>Informatique et multimédia</h3>
                   <p>Informatique</p>
                   <p>
                    <Button target={ "Electronique et Multimédia" } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
              <Col md={4}>
                 <Thumbnail src={"vehicules.jpg"} alt={ "ok" }>
                   <h3>Véhicules</h3>
                   <p>Voiture, Motos ...</p>
                   <p>
                     <Button target={ "Véhicules" }  bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
              <Col md={4}>
                 <Thumbnail src={ "immobilier.jpg" } alt={ "ok" }>
                   <h3>Immobilier</h3>
                   <p>Immobilier</p>
                   <p>
                     <Button target={ "Immobilier" } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                 <Thumbnail src={ "maison-et-jardin.jpg" } alt={ "ok" }>
                   <h3>Pour la maison et jardin</h3>
                   <p>Pour la maison et jardin</p>
                   <p>
                     <Button target={ "Pour la maison et Jardin" } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                   </p>
                 </Thumbnail>
               </Col>
              <Col md={4}>
               <Thumbnail src={ "habillement-et-bien-etre.jpg" } alt={ "ok" }>
                 <h3>Habillement et bien être</h3>
                 <p>Habillement et bien être</p>
                 <p>
                   <Button target={ "Habillement et bien etre" } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
                 </p>
               </Thumbnail>
            </Col>
            <Col md={4}>
               <Thumbnail src={ "loisirs.jpg" } alt={ "ok" }>
                 <h3>Loisirs et divertissement</h3>
                 <p>Loisirs et divertissement</p>
                 <p>
                   <Button target={ "Loisirs et Divertissement" } bsStyle="primary" onClick={ this.props.abonner }> <Icon name="eye" size="lg" /> S abonner</Button>&nbsp;
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
