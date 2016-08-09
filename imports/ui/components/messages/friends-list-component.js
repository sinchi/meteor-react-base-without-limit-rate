import React from 'react';
import { FriendsListItemComponent } from './friends-list-item-component.js';

export class FriendsListComponent extends React.Component {
  render(){
        let friends =  _.map(this.props.friends, (message) => {
        let user = (message.from.userId === Meteor.userId()) ? Meteor.users.findOne({ _id: message.to.userId }, { fields: { profile : 1 } }) : Meteor.users.findOne({ _id: message.from.userId }, { fields: { profile : 1 } });

        let active = "";
        if(!message.to.read && (message.from.userId !== Meteor.userId()))
          active = "active bounceInDown";
        else if(this.props.conversationId === message.conversationId)
          active = "active";
        return {
              _id: message._id,
              avatar: user.profile.avatar,
              name: user.profile.name.first + ' ' + user.profile.name.last,
              lastMessage: message.body,
              date:"2 min ago",
              count:1,
              active: active,
              sended:  message.from.userId === Meteor.userId(),
              read: message.to.read,
              user: user,
              conversationId: message.conversationId
        }
      });

    var list = _.map(friends, function(friend){
      return <FriendsListItemComponent key={ friend._id } friend={ friend } />
    });
    return(
      <ul className="friend-list">
        { list }
      </ul>
    )
  }
}
