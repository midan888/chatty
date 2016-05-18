import React from 'react';
import MessageItem from './message_item.react';

export default function (props) {

    var messages = [];
    props.messages.forEach(function(message, i){

        const cUser = message.user.nickname == props.cUser.nickname;

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
        <div className="message-list">
            {messages}
            <hr />
        </div>
    )
}
