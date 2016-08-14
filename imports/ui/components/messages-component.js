import React from 'react';
import ReactDOM from 'react-dom';
import { insertMessage, messageReceived } from "../../api/messages/methods";
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';
import { Sequence } from '../../api/sequences/sequence';
import { sequenceInc } from '../../api/sequences/methods';

export class MessagesComponent extends React.Component{

  constructor(){
    super(...arguments);
}

getUser(userId){
  return Meteor.users.findOne(userId, { fields: { profile: 1, status: 1 } });
}

  envoyer(event){
          if(event.key === 'Enter' && event.target.value !== ""){
            sequenceInc.call({ name: 'messages' });
            var content = event.target.value;
            //event.target.value = "";
             var msg = {
               sender: Meteor.userId(),
               receiver: this.props.userId,
               publication: new Date(),
               read: false,
               content: content,
               order: Sequence.findOne().seq
             };

             insertMessage.call(msg, function(error){
               if(error)
                Bert.alert(error.reason,"warning");
             });

          }
        }

  render(){
      var Entete = React.createClass({
        render(){
          return (
            <div className=" row border-bottom padding-sm" style={ {height: "40px"}}>
              { this.props.title }
            </div>
          )
        }
      });

      var FriendsListContent = React.createClass({
        render(){
          return (
            <div className="col-md-4 bg-white ">
                { this.props.children }
        	 </div>
          )
        }
      });

      var FriendsList = React.createClass({

        render(){
          var list = _.map(this.props.friends, function(friend){
            return <FriendsListItem key={ friend._id } friend={ friend } />
          });
            return(
              <ul className="friend-list">
                { list }
              </ul>
            )
        }
      });

      var FriendsListItem = React.createClass({

        getConversation(event){
          event.preventDefault();
          messageReceived.call({ sender: this.props.friend.user._id }, (error)=>{
            if(error)
              Bert.alert(error.reason, 'warning');
          });
          browserHistory.push('/messages/conversation/' + this.props.friend.user._id);
        },

        render(){
          const sended = this.props.friend.sended && !this.props.friend.read ? (<small className="chat-alert text-muted"><i className="fa fa-reply"></i></small>) : '';
          const receive = (!this.props.friend.sended && this.props.friend.count > 0) ? (<small className="chat-alert label label-danger">{ this.props.friend.count }</small>) : '';
          const readed  = (this.props.friend.sended && this.props.friend.read ) ? (<small className="chat-alert text-muted"><i className="fa fa-check"></i></small>) : '';
          return (
            <li className={ this.props.friend.active }>
              <a onClick={ this.getConversation } href="#" className="clearfix">
                <img src={ this.props.friend.avatar } alt="" className="img-circle" />
                <div className="friend-name">
                  <strong>{ this.props.friend.name }</strong>
                </div>
                <div className="last-message text-muted">{ this.props.friend.lastMessage }</div>
                <small className="time text-muted">{ this.props.friend.date }</small>
                {sended}
                { receive }
                { readed }
              </a>
            </li>
          )
        }
      });

      var DetailFriendMessageContent = React.createClass({
        render(){
          return (
            	<div id="messagesContent" className="col-md-8 bg-white ">
                  { this.props.children }
              </div>
          )
        }
      });

      var ChatMessagesContent = React.createClass({


        render(){
          return (
            <div id="chatMessagesContent" className="chat-message col-md-12" >
                { this.props.children }
            </div>
          )
        }
      });

      var ChatMessageList = React.createClass({

        componentDidMount(){
          $("#messagesContent").scrollTop($("#messagesContent")[0].scrollHeight);
        },

        render(){

          var chatMessages = _.map(this.props.messages, function(message){
            return <ChatMessageItem key={ message._id } message={ message } />
          });

          return (
            <ul className="chat col-md-12 col-sm-3" ref="chatBox" id="chatBox">
              { chatMessages }
            </ul>
          )
        }
      });

      var ChatMessageItem = React.createClass({
        render(){

          return (
            <li className={ this.props.message.position + " clearfix" }>
              <span className={"chat-img pull-" + this.props.message.position }>
                <img src={ this.props.message.image.src } alt={ this.props.message.image.alt } />
              </span>
              <div className="chat-body clearfix">
                <div className="header">
                  <strong className="primary-font">{ this.props.message.username }</strong>
                  <small className="pull-right text-muted"><i className="fa fa-clock-o"></i> { this.props.message.date }</small>

                </div>
                <p>
                  { this.props.message.content }
                </p>
              </div>
            </li>
          )
        }
      });

      var ChatBoxMessage = React.createClass({

        focus(event){
          event.preventDefault();
          if(this.props.userId)
            messageReceived.call({ sender: this.props.userId }, (error)=>{
              if(error)
                Bert.alert(error.reason, 'warning');
            });
        },

        render(){
          return (
            <div className="chat-box bg-white">
            	<div className="input-group">
            		<input onFocus={ this.focus } ref="msgContent" onKeyPress={ this.props.envoyer } className="form-control border no-shadow no-rounded" placeholder="Tapper votre message ici ..." />
            		<span className="input-group-btn">
            			<button className="btn btn-success no-rounded" type="button">Envoyer</button>
            		</span>
            	</div>{/*<!-- /input-group -->*/}
            </div>
          )
        }
      });

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


    return (
      <div className="container bootstrap snippet">
        <div className="row">
            <FriendsListContent>
              <Entete title="Ma boite de récéption" />
              <FriendsList friends={ friends }/>
            </FriendsListContent>
            <DetailFriendMessageContent>
              <ChatMessagesContent>
                <ChatMessageList messages={ this.props.messagesDetail }/>
              </ChatMessagesContent>
              <ChatBoxMessage userId={ this.props.userId } envoyer={ this.envoyer.bind(this) } />
            </DetailFriendMessageContent>
          </div>
        </div>
    )
  }
}
