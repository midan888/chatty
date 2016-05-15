import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import BaseComponent from '../base/base_component';
import { createRoom } from '../../actions/room_actions';

class RoomCreatePage extends BaseComponent {

    constructor(props){
        super(props);

        this.state = {
            room:props.room.data,
            roomCreating: false,
            hideForm: false,
            showGoToRoomButton: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render(){

        const room = this.props.room.data;
        const hideForm = this.state.hideForm;
        const showGoToRoomButton = this.state.showGoToRoomButton;
        const roomChatLink = room ? '/channel/' + room._id + '/chat' : '';
        const roomCreating = room ? false : this.state.roomCreating;

        const {fields : {name}, handleSubmit} = this.props;

        return (
            <div>
                <h1 className="text-center">Create channel and start messaging</h1>
                <h2 className="text-center">No registration needed, just username</h2>
                <div className="channel-form">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                        <form className={`${hideForm ? ' hide' : ''}`} onSubmit={handleSubmit(this.onFormSubmit)}>
                            <div className={`form-group ${name.touched && name.error ? ' has-error' : ''}`}>
                                <label className="control-label">Channel Name</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Family"
                                        className="form-control"
                                        {...name}
                                    />
                                    <div className="help-block has-error">
                                        {name.touched && name.error}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <button type="submit" className="btn btn-primary col-xs-12">create room</button>
                                </div>
                            </div>
                        </form>
                    </div>


                    <div className={`${showGoToRoomButton ? '' : 'hide'} col-xs-12  col-sm-6 col-sm-offset-3`}>
                        <p>Done! channel was created</p>
                        <Link to={roomChatLink}>
                            <button className="btn btn-primary col-xs-12">
                                Go to channel
                            </button>
                        </Link>
                    </div>
                    <span className={roomCreating ? '' : 'hide'}>Room creating</span>
                </div>
            </div>
        )
    }

    onFormSubmit(formData) {

        this.props.createRoom(formData.name);
        this.setState({
            roomCreating: true,
            showGoToRoomButton:true,
            hideForm: true
        });
    }
}

function validateForm(values) {

    const errors = {};

    if (!values.name) {
        errors.name = 'Enter a title';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        room: state.room
    }
}

export default reduxForm({
    form: 'CreateRoomForm',
    fields: ['name'],
    validate:validateForm
}, mapStateToProps, { createRoom })(RoomCreatePage);
