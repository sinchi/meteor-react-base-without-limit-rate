import React from 'react';
import { ChatMessageListItemComponent } from './chat-message-list-item-component.js';

export class ChatMessageListComponent extends React.Component{

  componentDidMount(){
    $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
  }

  render(){

    var chatMessages = _.map(this.props.messagesDetail, function(message){
      return <ChatMessageListItemComponent key={ message._id } message={ message } />
    });

    return (
      <ul className="chat" ref="chatBox" id="chatBox" style={ {height:"550px", width:"700px" , overflow:"scroll", overflowX:"hidden" ,overflowY:"scroll"}}>
        { chatMessages }
      </ul>
    )
  }
}
