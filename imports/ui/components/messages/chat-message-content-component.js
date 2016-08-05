import React from 'react';

export class ChatMessagesContentComponent extends React.Component {
  render(){
    return (
      <div className="chat-message">
          { this.props.children }
      </div>
    )
  }
}
