import React from 'react';
import { MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { ConversationMessages } from '../../../../api/messagerie/conversation-messages/conversation-messages.js';
import { readThemAll } from '../../../../api/messagerie/conversation-messages/methods.js';

export class DropDownMessagesMenuItemComponent extends React.Component {

  constructor(){
    super(...arguments);
  }

  componentDidMount(){
    console.log('im drop down item up');
  }

  getConversation(event){
    event.preventDefault();
    // messageReceived.call({ sender: this.props.friend.user._id }, (error)=>{
    //   if(error)
    //     Bert.alert(error.reason, 'warning');
    // });
    readThemAll.call({ conversationId: this.props.friend.conversationId, read: true }, (error) => {
      if(error)
        Bert.alert(error.reason, "warning");
    });
    let message = ConversationMessages.findOne({ conversationId: this.props.friend.conversationId }, { sort:{ order: -1 }, limit: 1 });
    let toUserId = "";
    if(message.from.userId === Meteor.userId()){
      toUserId = message.to.userId;
    }else{
      toUserId = message.from.userId
    }
    browserHistory.push('/messages/conversation/' + this.props.friend.conversationId +"/" + toUserId);
  }

  render(){
    const sended = this.props.friend.sended && !this.props.friend.read ? (<small className="chat-alert text-muted"><i className="fa fa-reply"></i></small>) : '';
    const receive = (!this.props.friend.sended && this.props.friend.count > 0) ? (<small className="chat-alert label label-danger pullRight">{ this.props.friend.count }</small>) : '';
    const senderReaded  = (this.props.friend.sended && this.props.friend.read ) ? (<small className="chat-alert text-muted"><i className="fa fa-check"></i></small>) : '';
    const receiverReaded = (!this.props.friend.sended && this.props.friend.count === 0 ) ? (<small className="chat-alert text-muted"><i className="fa fa-envelope-o"></i></small>) : '';
    const newOneOrSendedTo = (receive) ? <small className="chat-alert text-muted"><i className="fa fa-envelope"></i></small> : sended;
    const body = (this.props.friend.lastMessage.length > 50) ? this.props.friend.lastMessage.substring(0,50) + "..." : this.props.friend.lastMessage;



    return (<MenuItem onClick={ this.getConversation.bind(this) }   href="" eventKey={ this.props.friend._id } title={ this.props.friend.name }>
                <div>
                  <strong>{newOneOrSendedTo} { receiverReaded } { senderReaded } { this.props.friend.name }   { receive }</strong>
                  <div className="last-message text-muted">{ body }</div>
                  <small className="time text-muted"><i className="fa fa-clock-o"></i> { this.props.friend.date }</small>
                </div>
                {/*<img src={ this.props.friend.avatar } alt="" className="img-circle" />
                <div className="friend-name">
                  <strong>{ this.props.friend.name }</strong>
                </div>*/}

            </MenuItem>);
  }
}
