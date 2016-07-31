import React from 'react';
import ReactDOM from 'react-dom';
import { insertMessage } from "../../api/messages/methods";
import { Bert } from 'meteor/themeteorchef:bert';


export class MessagesComponent extends React.Component{

  constructor(){
    super(...arguments);

    this.state = {
      messages: [],
      friends:[],
    }
  }

  componentDidMount(){
    this.setState({ messages: this.props.messagesDetail });
   //  console.log(this.props.messagesData);
  let friends =  _.map(this.props.messagesData, (message) => {
      return {

    				_id: message._id,
    				avatar: "http://bootdey.com/img/Content/user_1.jpg",
    				name: message.sender ? (message.sender.profile.name.first + ' ' + message.sender.profile.name.last) : (message.receiver.profile.name.first + ' ' + message.receiver.profile.name.last),
    				lastMessage: message.content,
    				date:"2 min ago",
    				count:1,
    				active: message.read ? "" : "active bounceInDown"

      }
    });

    this.setState({ friends: friends });
  }

getUser(userId){
  return Meteor.users.findOne(userId, { fields: { profile: 1 } });
}

  envoyer(event){
          if(event.key === 'Enter' && event.target.value !== ""){
            var content = event.target.value;
            event.target.value = "";
             var msg = {
               sender: Meteor.userId(),
               receiver: "123",
               publication: new Date(),
               read: false,
               content: content
             };
             console.log(msg);
            //  insertMessage.call(msg, function(error){
            //    if(error)
            //     Bert.alert(error.reason,"warning");
            //  });


            this.state.messages.push({
              position: "right",
              image:{
                src: "http://bootdey.com/img/Content/user_2.jpg",
                alt: "",
              },
              username: "Samah Courtane",
              date:"12 mins ago",
              content: content
            });

            this.setState({ messages: this.state.messages });
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
        render(){
          const sended = this.props.friend.sended ? (<small className="chat-alert text-muted"><i className="fa fa-reply"></i></small>) : (<small className="chat-alert label label-danger">{ this.props.friend.count }</small>);
          return (
            <li className={ this.props.friend.active }>
              <a href="#" className="clearfix">
                <img src={ this.props.friend.avatar } alt="" className="img-circle" />
                <div className="friend-name">
                  <strong>{ this.props.friend.name }</strong>
                </div>
                <div className="last-message text-muted">{ this.props.friend.lastMessage }</div>
                <small className="time text-muted">{ this.props.friend.date }</small>
                {sended}
              </a>
            </li>
          )
        }
      });

      var DetailFriendMessageContent = React.createClass({
        render(){
          return (
            	<div className="col-md-8 bg-white ">
                  { this.props.children }
              </div>
          )
        }
      });

      var ChatMessagesContent = React.createClass({
        render(){
          return (
            <div className="chat-message">
                { this.props.children }
            </div>
          )
        }
      });

      var ChatMessageList = React.createClass({

        componentDidMount(){
          $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
        },

        render(){

          var chatMessages = _.map(this.props.messages, function(message){
            return <ChatMessageItem key={ message._id } message={ message } />
          });

          return (
            <ul className="chat" ref="chatBox" id="chatBox" style={ {height:"550px", width:"700px" , overflow:"scroll", overflowX:"hidden" ,overflowY:"scroll"}}>
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

        render(){
          return (
            <div className="chat-box bg-white">
            	<div className="input-group">
            		<input autoFocus ref="msgContent" onKeyPress={ this.props.envoyer } className="form-control border no-shadow no-rounded" placeholder="Tapper votre message ici ..." />
            		<span className="input-group-btn">
            			<button className="btn btn-success no-rounded" type="button">Envoyer</button>
            		</span>
            	</div>{/*<!-- /input-group -->*/}
            </div>
          )
        }
      });



      let friends =  _.map(this.props.users, (message) => {
          let user = message[0].sender._id === Meteor.userId() ? message[0].receiver : message[0].sender;
          return {
        				_id: message._id,
        				avatar: "http://bootdey.com/img/Content/user_1.jpg",
        				name: user.profile.name.first + ' ' + user.profile.name.last,
        				lastMessage: message[0].content,
        				date:"2 min ago",
        				count:1,
        				active: message.read || message[0].sender._id === Meteor.userId() ? "" : "active bounceInDown",
                sended: message[0].sender._id === Meteor.userId()
          }
        });
    return (
      <div className="container bootstrap snippet">
        <div className="row">
            <FriendsListContent>
              <Entete title="Membre" />
              <FriendsList friends={ friends }/>
            </FriendsListContent>
            <DetailFriendMessageContent>
              <ChatMessagesContent>
                <ChatMessageList messages={ this.props.messagesDetail }/>
              </ChatMessagesContent>
              <ChatBoxMessage envoyer={ this.envoyer.bind(this) } />
            </DetailFriendMessageContent>
          </div>
        </div>
    )
  }
}
