import React from 'react';
import MessageItem from './message_item.react';

export default function (props) {
    var messages = [];
    props.messages.forEach(function(message, i){

        messages.push(<MessageItem
            key={i}
            author={message.user.nickname}
            created={message.date}
            text={message.text}
            dsiabled={!message.stored}
            id={message._id}
        />);
    });

    return (
        <div className="message-list">
            {messages}
            <hr />
        </div>
    )
}