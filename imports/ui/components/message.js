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
            <form ref="messageForm">
              <FormGroup controlId="messageContent">
               <ControlLabel>Message:</ControlLabel>
               <FormControl onKeyUp={ this.props.messageText } componentClass="textarea" ref="messageContent" placeholder="Tapez votre message içi ..." />
             </FormGroup>
             <Button type="submit" onClick={ this.props.envoyer }  bsStyle="success"><Icon name="send" size="lg" /> Envoyer</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
