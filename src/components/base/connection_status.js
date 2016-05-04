import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from './base_component';

class ConnectionStatus extends BaseComponent {

    render() {

        return (
            <div>
                <div className="pull-right">
                    <span
                        className={`label label-${this.props.app.online ? 'success' : 'danger'}`}
                    >{this.props.app.online ? 'Online' : 'Connecting'}</span>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(ConnectionStatus);