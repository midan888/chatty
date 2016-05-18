import React from 'react';
import ConnectionStatus from './connection_status';

class BaseComponent extends React.Component {

    render() {
        return (
            <div className="container">
                <ConnectionStatus />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default BaseComponent;
