import React from 'react';

import  MessagesComponent  from '../containers/messages-container';

export class Messages extends React.Component{



  render(){
    return <MessagesComponent userId={ this.props.params.userId }/>
  }
}
