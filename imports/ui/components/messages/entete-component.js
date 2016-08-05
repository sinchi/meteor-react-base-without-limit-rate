import React from 'react';

export class EnteteComponent extends React.Component {
  render(){
    return (
      <div className=" row border-bottom padding-sm" style={ {height: "40px"}}>
        { this.props.title }
      </div>
    )
  }
}
