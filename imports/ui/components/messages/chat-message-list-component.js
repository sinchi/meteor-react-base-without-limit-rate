import React from 'react';
import { ChatMessageListItemComponent } from './chat-message-list-item-component.js';

export class ChatMessageListComponent extends React.Component{


  render(){

    var chatMessages = _.map(this.props.messagesDetail, function(message){
      return <ChatMessageListItemComponent key={ message._id } message={ message } />
    });

    return (
      <ul className="chat" ref="chatBox" id="chatBox">
        { chatMessages }
      </ul>
    )
  }
}
