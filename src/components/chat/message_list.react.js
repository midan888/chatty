import React from 'react';
import MessageItem from './message_item.react';
import BaseComponent from '../base/base_component';
import jQuery from 'jquery';

class MessageList extends BaseComponent {

  componentDidMount() {
    this.scrollListToBottom();
  }

  componentDidUpdate() {
      this.scrollListToBottom();
  }

  scrollListToBottom() {
    jQuery(this._messageList).animate({scrollTop:this._messageList.scrollHeight}, 300, 'swing');
  }

  render() {
    let messages = [];
    let that = this;
    this.props.messages.forEach(function(message, i){

        const cUser = message.user.nickname == that.props.cUser.nickname;

        messages.push(<MessageItem
            key={i}
            author={message.user.nickname}
            created={message.date}
            text={message.text}
            dsiabled={!message.stored}
            id={message._id}
            cUser={cUser}
        />);
    });

    return (
        <div className="message-list" ref={ (c) => this._messageList = c }>
            {messages}
        </div>
    );
  }
}

export default MessageList;
