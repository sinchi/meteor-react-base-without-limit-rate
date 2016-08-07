import React from 'react';

import  MessagesComponent  from '../containers/messages-container';
import FriendsListComponent from '../containers/messages/friends-list-container';
import { FriendsListContentComponent } from '../components/messages/friends-list-content-component';
import { DetailFriendMessageContentComponent } from '../components/messages/details-friends-message-content-component';
import  ChatMessageListComponent  from '../containers/messages/messages-detail-container';
import { ChatBoxMessage } from '../components/messages/chat-box-message';
import { EnteteComponent } from '../components/messages/entete-component';
import { sequenceInc } from '../../api/sequences/methods';
import { Sequence } from '../../api/sequences/sequence';
import { insertMessage } from '../../api/messages/methods';

export class Messages extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      content: ''
    }
}

getUser(userId){
  return Meteor.users.findOne(userId, { fields: { profile: 1 } });
}


  render(){
    let chatBox = (this.props.params.userId) ?  <ChatBoxMessage userId={ this.props.params.userId }  /> : '';
    return (
      <div className="container bootstrap snippet">
        <div className="row">
            <FriendsListContentComponent>
              <EnteteComponent title={ "Ma boite de réception" }/>
              <FriendsListComponent userId={ this.props.params.userId }/>
            </FriendsListContentComponent>
            <DetailFriendMessageContentComponent>
              <ChatMessageListComponent userId={ this.props.params.userId }/>
              { chatBox }
            </DetailFriendMessageContentComponent>
        </div>
      </div>
    )

    {/* return <MessagesComponent userId={ this.props.params.userId }/> */}
  }
}
