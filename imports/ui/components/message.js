import React from 'react';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Icon } from 'react-fa';
export class Message extends React.Component{

  render(){
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Envoyer un message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsTextarea">
               <ControlLabel>Message:</ControlLabel>
               <FormControl componentClass="textarea" placeholder="Tapez votre message içi ..." />
             </FormGroup>
             <Button onClick={ this.props.envoyer }  bsStyle="success"><Icon name="send" size="lg" /> Envoyer</Button>
            </form>
          </Modal.Body>        
        </Modal>
      </div>
    )
  }
}
