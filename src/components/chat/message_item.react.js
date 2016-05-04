import React from 'react';

export default function (props) {
    return (
        <div className="row">
            <div className="col-xs-2">
                <div>
                    <span className="label label-default">{props.author}</span>
                </div>
            </div>
            <div className="col-xs-6 text-info">{props.text}</div>
            <div className="col-xs-4 hide">
                <button>Delete message</button>
                <button>Edit message</button>
            </div>
        </div>
    )
}
