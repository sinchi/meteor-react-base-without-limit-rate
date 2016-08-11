import React from 'react';

import moment from '../../../modules/moment.js';

export class ChatMessageListItemComponent extends React.Component{


  componentDidMount(){
    // if(Meteor.userId() === this.props.message.to){
    //   var playSound = (function beep() {
    //   var sound = new Audio("https://s3.eu-central-1.amazonaws.com/annoncio-photos/knob.ogg");
    //       return function() {
    //           sound.play();
    //         }
    //         })();
    //     playSound(); // Play first time
    // }
    $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
  }

  render(){
    moment.locale('fr');
    let date = moment(this.props.message.date).format("HH:mm  DD/MM/YYYY");

    return (

      <li className={ this.props.message.position + " clearfix" }>
        <span className={"chat-img pull-" + this.props.message.position }>
          <img src={ this.props.message.image.src } alt={ this.props.message.image.alt } />
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className="primary-font">{ this.props.message.username }</strong>
            <small className="pull-right text-muted"><i className="fa fa-clock-o"></i> { date }</small>
          </div>
          <p>
            { this.props.message.content }
          </p>
        </div>
      </li>
    )
  }
}
