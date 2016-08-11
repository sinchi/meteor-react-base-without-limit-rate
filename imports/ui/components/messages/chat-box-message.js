import React from 'react';
import ReactDOM from 'react-dom';
import { insertMessage, messageReceived } from '../../../api/messages/methods.js';

import { Conversations } from '../../../api/messagerie/conversations/conversations.js';
import { ConversationMessages } from '../../../api/messagerie/conversation-messages/conversation-messages.js';
import { insertConversationMessages } from '../../../api/messagerie/conversation-messages/methods.js';

import { sequenceInc } from '../../../api/sequences/methods';
import { Sequence } from '../../../api/sequences/sequence';
import { getInputValue } from '../../../modules/get-input-value';

export class ChatBoxMessage extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      content: ''
    }
  }

  focus(event){
    event.preventDefault();
    if(this.props.userId)
      messageReceived.call({ sender: this.props.userId }, (error)=>{
        if(error)
          Bert.alert(error.reason, 'warning');
      });
  }

  sendMessage(event){
    event.preventDefault();

    if(this.state.content && this.state.content !== ""){
        sequenceInc.call({ name: 'messages' });
        let conversationExist = Conversations.findOne({$or: [{'originatingFromId': Meteor.userId()}, {'originatingToId': Meteor.userId()}], $or: [{'originatingFromId': this.props.toUserId}, {'originatingToId': this.props.toUserId}]});
        if(conversationExist){
          console.log("toUserId", this.props.toUserId);
          let message = {
            conversationId: conversationExist._id,
            from:{
              userId: Meteor.userId()
            },
            to:{
              userId: this.props.toUserId,
              read: false
            },
            body: this.state.content,
            publication: new Date(),
            order: Sequence.findOne().seq
          };
          let that = this;
          insertConversationMessages.call(message, (error) => {
            if(error)
             Bert.alert(error.reason,"warning");

             that.setState({ content: "" });
             ReactDOM.findDOMNode(that.refs.msgContent).value = "";
          });
        }
        //  var msg = {
        //    sender: Meteor.userId(),
        //    receiver: this.props.userId,
        //    publication: new Date(),
        //    read: false,
        //    content: this.state.content,
        //    order: Sequence.findOne().seq
        //  };
        //  let that = this;
        //  insertMessage.call(msg, function(error){
        //    if(error)
        //     Bert.alert(error.reason,"warning");
         //
        //     that.setState({ content: "" });
        //     ReactDOM.findDOMNode(that.refs.msgContent).value = "";
        //  });

      }
    }


  onWriting(event){
    if(event.target.value && event.target.value !== ""){
      this.setState({ content: event.target.value });
    }

  }

  onEnterPress(event){
    if(event.key === 'Enter' && event.target.value !== ""){
      sequenceInc.call({ name: 'messages' });
      let conversationExist = Conversations.findOne({$or: [{'originatingFromId': Meteor.userId()}, {'originatingToId': Meteor.userId()}], $or: [{'originatingFromId': this.props.toUserId}, {'originatingToId': this.props.toUserId}]});
      if(conversationExist){
        console.log("toUserId", this.props.toUserId);
        let message = {
          conversationId: conversationExist._id,
          from:{
            userId: Meteor.userId()
          },
          to:{
            userId: this.props.toUserId,
            read: false
          },
          body: this.state.content,
          publication: new Date(),
          order: Sequence.findOne().seq
        };
        let that = this;
        insertConversationMessages.call(message, (error) => {
          if(error)
           Bert.alert(error.reason,"warning");

           that.setState({ content: "" });
           ReactDOM.findDOMNode(that.refs.msgContent).value = "";
        });
      }
      //  var msg = {
      //    sender: Meteor.userId(),
      //    receiver: this.props.userId,
      //    publication: new Date(),
      //    read: false,
      //    content: this.state.content,
      //    order: Sequence.findOne().seq
      //  };
      //  let that = this;
      //  insertMessage.call(msg, function(error){
      //    if(error)
      //     Bert.alert(error.reason,"warning");
       //
      //     that.setState({ content: "" });
      //     ReactDOM.findDOMNode(that.refs.msgContent).value = "";
      //  });
    }
  }

  render(){
    return (
      <div className="chat-box bg-white">
        <div className="input-group">
          <input onFocus={ this.focus.bind(this) } autoFocus ref="msgContent" onKeyUp={ this.onWriting.bind(this) } onKeyPress={ this.onEnterPress.bind(this) } className="form-control border no-shadow no-rounded" placeholder="Tapper votre message ici ..." />
          <span className="input-group-btn">
            <button onClick={ this.sendMessage.bind(this) } className="btn btn-success no-rounded" type="button">Envoyer</button>
          </span>
        </div>{/*<!-- /input-group -->*/}
      </div>
    )
  }

}
