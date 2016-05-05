// libs
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// actions
import { getProfile } from '../../actions/user_actions';
import { joinRoom } from '../../actions/chat_actions';
import { deleteRoom } from '../../actions/room_actions';
//components
import NicknameForm from './nickname_form.react';
import MessageForm from './message_form';
import MessageList from './message_list.react';
import BaseComponent from '../base/base_component';
import RoomNotFound from './room_not_found';
import DeleteModal from '../base/delete_modal';
import Loader from '../base/loader';

class ChatPage extends BaseComponent {

    constructor(props){
        super(props);

        this.deleteRoom = this.deleteRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.promptDeleteRoom = this.promptDeleteRoom.bind(this);

        this.state = {
            isJoining: false
        };
    }

    joinRoom() {
        const token = this.props.user.authToken;
        if (token) {
            this.props.getProfile().then(() => {
                this.props.joinRoom(this.props.params.id);
            });
        }
    }

    componentWillMount() {
        this.joinRoom();
    }

    deleteRoom() {
        this.props.deleteRoom(this.props.chat.roomId).then(() => {
            this.context.router.push('/');
        });
    }

    promptDeleteRoom() {
        this.deleteRoom();
    }

    render(){

        if (!this.props.user.authToken) {
            return (
                <div className="chat-page">
                    <NicknameForm onNickNameSet={() => { this.joinRoom() }}/>
                </div>
            )
        }

        if (this.props.chat.roomNotFound) {
            return (
                <div className="chat-page">
                    <RoomNotFound />
                </div>
            )
        }

        if (!this.props.chat.joined) {
            return (
                <Loader />
            )
        }

        return (

            <div className="chat-page">
                <div className="message-box">
                    <div className="chat-page-header">
                        <div className="row">
                            <div className="col-xs-8">
                                <h2>Channel: {this.props.chat.roomName}</h2>
                            </div>
                            <div className="col-xs-4">
                                <br />
                                <div class="row">
                                    <div className="col-xs-12">
                                        <button onClick={this.promptDeleteRoom} className="btn btn-danger btn-xs">Delete channel</button>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div className="col-xs-12">
                                        <Link to="/">
                                            <button className="btn btn-info btn-xs">New channel</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MessageList messages={this.props.chat.messages} />
                    <MessageForm typingUserList={this.props.chat.typingUserList} />

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //<DeleteModal onConfirm={this.deleteRoom} />
    return {
        chat: state.chat,
        user: state.user
    }
}

ChatPage. contextTypes = {
    router: PropTypes.object
};

export default connect(mapStateToProps, { getProfile, joinRoom, deleteRoom })(ChatPage);
