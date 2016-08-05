import React from 'react';

export class DetailFriendMessageContentComponent extends React.Component{

  render(){
    return (
        <div className="col-md-8 bg-white ">
            { this.props.children }
        </div>
    )
  }
}
