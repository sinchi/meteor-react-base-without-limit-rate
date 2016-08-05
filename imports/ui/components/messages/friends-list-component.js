import React from 'react';
import { FriendsListItemComponent } from './friends-list-item-component.js';

export class FriendsListComponent extends React.Component {
  render(){
        let friends =  _.map(this.props.friends, (message) => {
        let user = message[0].sender._id === Meteor.userId() ? message[0].receiver : message[0].sender;
        let active = "";
        if(!message[0].read && (message[0].sender._id !== Meteor.userId()))
          active = "active bounceInDown";
        else if(this.props.userId === user._id)
          active = "active";
        return {
              _id: message[0]._id,
              avatar: user.profile.avatar,
              name: user.profile.name.first + ' ' + user.profile.name.last,
              lastMessage: message[0].content,
              date:"2 min ago",
              count:message[0].count,
              active: active,
              sended: message[0].sender._id === Meteor.userId(),
              read: message[0].read,
              user: user
        }
      });

    var list = _.map(friends, function(friend){
      return <FriendsListItem key={ friend._id } friend={ friend } />
    });
    return(
      <ul className="friend-list">
        { list }
      </ul>
    )
  }
}
