import React from 'react';

export default function (props) {

    let users = props.users || [];

    let usersString = '';
    users.forEach(function(user){
        usersString+=user.nickname + ', ';
    });
    usersString = usersString.replace(/, $/, '');

    return (
        <div>
            <p><em>{usersString}</em></p>
        </div>
    );

}
