import React from 'react';

export class ChatMessageListItemComponent extends React.Component{

  componentDidMount(){
    $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
  }

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
}
