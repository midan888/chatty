import React from 'react';

export default function (props) {

  let users = props.users || [];
  let usersDom = [];

  users.forEach(function(user, i){
    usersDom.push(
        <span>
            <span className="label label-default" key={i}>{user.nickname}</span>
            <span> | </span>
        </span>
    )
  });

  return (
    <div>
        Online users: {usersDom}
    </div>
  );

}
