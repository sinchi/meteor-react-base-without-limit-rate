import React from 'react';
import { messageReceived } from '../../../api/messages/methods.js';
export class ChatBoxMessage extends React.Component{

  focus(event){
    event.preventDefault();
    if(this.props.userId)
      messageReceived.call({ sender: this.props.userId }, (error)=>{
        if(error)
          Bert.alert(error.reason, 'warning');
      });
  }

  render(){
    return (
      <div className="chat-box bg-white">
        <div className="input-group">
          <input onFocus={ this.focus.bind(this) } autoFocus ref="msgContent" onKeyPress={ this.props.envoyer } className="form-control border no-shadow no-rounded" placeholder="Tapper votre message ici ..." />
          <span className="input-group-btn">
            <button className="btn btn-success no-rounded" type="button">Envoyer</button>
          </span>
        </div>{/*<!-- /input-group -->*/}
      </div>
    )
  }

}
