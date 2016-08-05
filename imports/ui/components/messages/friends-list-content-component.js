import React from 'react';

export class FriendsListContentComponent extends React.Component {
  render(){
    return (
      <div className="col-md-4 bg-white ">
          { this.props.children }
     </div>
    )
  }
}
