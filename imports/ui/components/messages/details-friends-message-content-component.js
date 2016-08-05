import React from 'react';

export class DetailFriendMessageContentComponent extends React.Component{

  render(){
    return (
        <div className="col-md-8 bg-white ">
          <div className="chat-message">
              { this.props.children }
          </div>
        </div>
    )
  }
}
