import React from 'react';
import ReactDOM from 'react-dom';
import { insertMessage, messageReceived } from '../../../api/messages/methods.js';

import { sequenceInc } from '../../../api/sequences/methods';
import { Sequence } from '../../../api/sequences/sequence';
import { getInputValue } from '../../../modules/get-input-value';

export class ChatBoxMessage extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      content: ''
    }
  }

  focus(event){
    event.preventDefault();
    if(this.props.userId)
      messageReceived.call({ sender: this.props.userId }, (error)=>{
        if(error)
          Bert.alert(error.reason, 'warning');
      });
  }

  sendMessage(event){
    event.preventDefault();

    if(this.state.content && this.state.content !== ""){
        sequenceInc.call({ name: 'messages' });
         var msg = {
           sender: Meteor.userId(),
           receiver: this.props.userId,
           publication: new Date(),
           read: false,
           content: this.state.content,
           order: Sequence.findOne().seq
         };
         let that = this;
         insertMessage.call(msg, function(error){
           if(error)
            Bert.alert(error.reason,"warning");

            that.setState({ content: "" });
            ReactDOM.findDOMNode(that.refs.msgContent).value = "";
         });

      }
    }


  onWriting(event){
    if(event.target.value && event.target.value !== ""){
      this.setState({ content: event.target.value });
    }

  }

  render(){
    return (
      <div className="chat-box bg-white">
        <div className="input-group">
          <input onFocus={ this.focus.bind(this) } autoFocus ref="msgContent" onKeyUp={ this.onWriting.bind(this) } onKeyPress={ this.props.onEnterPress } className="form-control border no-shadow no-rounded" placeholder="Tapper votre message ici ..." />
          <span className="input-group-btn">
            <button onClick={ this.sendMessage.bind(this) } className="btn btn-success no-rounded" type="button">Envoyer</button>
          </span>
        </div>{/*<!-- /input-group -->*/}
      </div>
    )
  }

}
