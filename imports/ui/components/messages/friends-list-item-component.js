import React from 'react';
import { messageReceived } from '../../../api/messages/methods.js';
import { browserHistory } from 'react-router';

export class FriendsListItemComponent extends React.Component {

  getConversation(event){
    event.preventDefault();
    messageReceived.call({ sender: this.props.friend.user._id }, (error)=>{
      if(error)
        Bert.alert(error.reason, 'warning');
    });
    browserHistory.push('/messages/conversation/' + this.props.friend.user._id);
  }

  render(){
    const sended = this.props.friend.sended && !this.props.friend.read ? (<small className="chat-alert text-muted"><i className="fa fa-reply"></i></small>) : '';
    const receive = (!this.props.friend.sended && this.props.friend.count > 0) ? (<small className="chat-alert label label-danger">{ this.props.friend.count }</small>) : '';
    const readed  = (this.props.friend.sended && this.props.friend.read ) ? (<small className="chat-alert text-muted"><i className="fa fa-check"></i></small>) : '';
    return (
      <li className={ this.props.friend.active }>
        <a onClick={ this.getConversation.bind(this) } href="#" className="clearfix">
          <img src={ this.props.friend.avatar } alt="" className="img-circle" />
          <div className="friend-name">
            <strong>{ this.props.friend.name }</strong>
          </div>
          <div className="last-message text-muted">{ this.props.friend.lastMessage }</div>
          <small className="time text-muted">{ this.props.friend.date }</small>
          {sended}
          { receive }
          { readed }
        </a>
      </li>
    )
  }

}
