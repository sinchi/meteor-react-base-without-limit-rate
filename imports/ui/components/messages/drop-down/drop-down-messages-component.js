import React from 'react';

import { DropDownMessagesMenuItemComponent } from './drop-down-messages-menu-item-component.js';
import { ConversationMessages } from '../../../../api/messagerie/conversation-messages/conversation-messages.js';

import { NavDropdown,MenuItem, Badge } from 'react-bootstrap';
import { Icon } from 'react-fa';

export class DropDownMessagesComponent extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      countAllMessage: 0
    }
  }

  getTotalMessagesCountBadge(){
      if(this.state.countAllMessage > 0)
        if(this.state.countAllMessage > 23)
          return <Badge pullRight>+23</Badge>
        else
          return <Badge pullRight>{this.state.countAllMessage}</Badge>
  }

  render(){
          let friends =  _.map(this.props.friends, (message) => {
          let user = (message.from.userId === Meteor.userId()) ? Meteor.users.findOne({ _id: message.to.userId }, { fields: { profile : 1 } }) : Meteor.users.findOne({ _id: message.from.userId }, { fields: { profile : 1 } });
          let that = this;
          let active = false;
          if(!message.to.read && (message.from.userId !== Meteor.userId()))
            active = "active bounceInDown";
          else if(this.props.conversationId === message.conversationId)
            active = true;
          let countReceivedMessageNumber = ConversationMessages.find({ conversationId: message.conversationId, "to.userId": Meteor.userId(), "to.read": false }).count();
          that.setState({ countAllMessage: that.state.countAllMessage + countReceivedMessageNumber });
          return {
                _id: message._id,
                avatar: user.profile.avatar,
                name: user.profile.name.first + ' ' + user.profile.name.last,
                lastMessage: message.body,
                date:"2 min ago",
                count: (countReceivedMessageNumber > 22) ? "+23" : countReceivedMessageNumber ,
                active: active,
                sended:  message.from.userId === Meteor.userId(),
                read: message.to.read,
                user: user,
                conversationId: message.conversationId
          }
        });
        console.log("friends", friends);
    let eventKey = 2;
    let friendsMenuItems = _.map(friends,  (friend) => {
      eventKey++;
        return <DropDownMessagesMenuItemComponent friend= { friend }/>
    });
    //     return <MenuItem onSelect={this.props.makeRead}  eventKey={ category._id }><Icon name={ this.getIconNotification(category) } size="lg" pullLeft/> { category.name } {this.getCategoryNotification(category)}</MenuItem>;
    // });
    //
    // let menuItems = (this.props.categories && this.props.categories.length > 0) ? items : (<MenuItem eventKey={ 2.2 } > Vous n êtes abonné à aucune catégorie !</MenuItem>);

    return (
      <NavDropdown
        eventKey={ 2 }
        title={<span>  Messages { this.getTotalMessagesCountBadge() }</span> }
        id="basic-nav-dropdown">
        <MenuItem eventKey={ 2.1 } ><Icon name="plus-circle" size="lg" /> Afficher Tous </MenuItem>
        <MenuItem divider />
        { friendsMenuItems }
        {/* menuItems */}
     </NavDropdown>

    )
  }
}
