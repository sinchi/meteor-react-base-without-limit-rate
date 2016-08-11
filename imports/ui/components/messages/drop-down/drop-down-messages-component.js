import React from 'react';

import { browserHistory } from 'react-router';
import { DropDownMessagesMenuItemComponent } from './drop-down-messages-menu-item-component.js';
import { ConversationMessages } from '../../../../api/messagerie/conversation-messages/conversation-messages.js';

import { NavDropdown,MenuItem, Badge } from 'react-bootstrap';
import { Icon } from 'react-fa';

import moment from '../../../../modules/moment.js';

export class DropDownMessagesComponent extends React.Component{

  getTotalMessagesCountBadge(count){
      if(count > 0)
        if(count > 23)
          return <Badge pullRight>+23</Badge>
        else
          return <Badge pullRight>{count}</Badge>
  }

  goToMessagePage(event){
    event.preventDefault();
    browserHistory.push('/messages');
  }

  render(){
          let countAllMessage = 0;
          let friends =  _.map(this.props.friends, (message) => {
          let user = (message.from.userId === Meteor.userId()) ? Meteor.users.findOne({ _id: message.to.userId }, { fields: { profile : 1 } }) : Meteor.users.findOne({ _id: message.from.userId }, { fields: { profile : 1 } });
          let that = this;
          let active = false;

          if(!message.to.read && (message.from.userId !== Meteor.userId()))
            active = "active bounceInDown";
          else if(this.props.conversationId === message.conversationId)
            active = true;
          let countReceivedMessageNumber = ConversationMessages.find({ conversationId: message.conversationId, "to.userId": Meteor.userId(), "to.read": false }).count();
          if(countReceivedMessageNumber > 0){
            countAllMessage +=1;
          }
          moment.locale('fr');
          let date = moment(message.publication);

          return {
                _id: message._id,
                avatar: user.profile.avatar,
                name: user.profile.name.first + ' ' + user.profile.name.last,
                lastMessage: message.body,
                date: date.fromNow(true),
                count: (countReceivedMessageNumber > 22) ? "+23" : countReceivedMessageNumber ,
                active: active,
                sended:  message.from.userId === Meteor.userId(),
                read: message.to.read,
                user: user,
                conversationId: message.conversationId,
                to: message.to.userId
          }
        });
        console.log("friends", friends);
    let eventKey = 2;
    let friendsMenuItems = _.map(friends,  (friend) => {
        return <DropDownMessagesMenuItemComponent friend= { friend }/>
    });

    return (
      <NavDropdown
        eventKey={ 2 }
        title={<span>  Messages { this.getTotalMessagesCountBadge(countAllMessage ) } </span> }
        id="basic-nav-dropdown">
        {<MenuItem onClick={ this.goToMessagePage.bind(this) } eventKey={ 2.1 } ><Icon name="exclamation-circle" size="lg" /> Afficher Tous </MenuItem>}
        <MenuItem divider />
        { friendsMenuItems }
        {/* menuItems */}
     </NavDropdown>

    )
  }
}
