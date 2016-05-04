import React from 'react';
import ConnectionStatus from './connection_status';

class BaseComponent extends React.Component {

    render() {
        return (
            <div className="container">
                <ConnectionStatus />
                {this.props.children}
            </div>
        )
    }

}

export default BaseComponent;