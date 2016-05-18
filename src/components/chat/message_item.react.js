import React from 'react';

export default function (props) {

    console.log(props);

    if (props.cUser) {
        return (
            <div className="row message-item-container">
                <div className="col-sm-2 pull-right">
                    <p className="text-info author">{props.author}</p>
                </div>
                <div className="col-sm-10 text-right">
                    <p className="text text-left">{props.text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row message-item-container">
                <div className="col-sm-2">
                    <p className="text-info author">{props.author}</p>
                </div>
                <div className="col-sm-10">
                    <p className="text">{props.text}</p>
                </div>
            </div>
        )
    }
}
