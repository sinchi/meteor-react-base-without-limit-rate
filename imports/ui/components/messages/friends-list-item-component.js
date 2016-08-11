import React from 'react';
import { messageReceived } from '../../../api/messages/methods.js';
import { browserHistory } from 'react-router';
import { ConversationMessages } from '../../../api/messagerie/conversation-messages/conversation-messages.js';
import { readThemAll } from '../../../api/messagerie/conversation-messages/methods.js';
import moment from '../../../modules/moment.js';

export class FriendsListItemComponent extends React.Component {



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
    const receive = (!this.props.friend.sended && this.props.friend.count > 0) ? (<small className="chat-alert label label-danger">{ this.props.friend.count }</small>) : '';
    const readed  = (this.props.friend.sended && this.props.friend.read ) ? (<small className="chat-alert text-muted"><i className="fa fa-check"></i></small>) : '';
    moment.locale('fr');

    let date = moment(this.props.friend.date);

  

    return (
      <li className={ this.props.friend.active }>
        <a onClick={ this.getConversation.bind(this) } href="#" className="clearfix">
          <img src={ this.props.friend.avatar } alt="" className="img-circle" />
          <div className="friend-name">
            <strong>{ this.props.friend.name }</strong>
          </div>
          <div className="last-message text-muted">{ this.props.friend.lastMessage }</div>
          <small className="pull-right text-muted"><i className="fa fa-clock-o"></i> { date.fromNow(true) }</small>
          {sended}
          { receive }
          { readed }
        </a>
      </li>
    )
  }

}
