import React from 'react';
import { reduxForm } from 'redux-form';
import BaseComponent from '../base/base_component';
import { createMessage, userTyping, listenUserTyping, clearUserTypings } from '../../actions/chat_actions';

class MessageForm extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            buttonState: 'disabled'
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.props.listenUserTyping();
        setInterval(() => {
            this.props.clearUserTypings();
        }, 4000);
    }

    render() {

        const {fields : {message}, handleSubmit} = this.props;
        var typingUsers = [];

        this.props.typingUserList.forEach(function(nickname){
            typingUsers.push(
                <span className="nicknames" key={nickname}>{nickname} is typing</span>
            );
        });

        return (

            <div className="message-form-container">
                <form className="form-horizontal" onSubmit={handleSubmit(this.submitMessage)} autoComplete="off">
                    <div className="form-group">
                        <div className="col-xs-10">
                            <input
                                type="text"
                                placeholder="hi!"
                                className="form-control"
                                {...message}
                                onChange={(event) => {
                                    message.onChange(event);
                                    this.props.userTyping(this.props.roomId);
                                }}
                            />

                            <div>{typingUsers}</div>
                        </div>
                        <div className="col-xs-2">
                            <button className={`btn btn-sm btn-success ${message.error ? 'disabled' : ''}`}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    submitMessage(formData) {
        this.props.createMessage(this.props.roomId, formData.message);
        this.props.resetForm();
    }
}

function validateForm(values) {

    const errors = {};

    if (!values.message) {
        errors.message = 'Enter a message';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        roomId: state.chat.roomId
    }
}

export default reduxForm({
    form: 'CreateMessageForm',
    fields: ['message'],
    validate:validateForm
}, mapStateToProps, { createMessage, userTyping, listenUserTyping, clearUserTypings })(MessageForm);
