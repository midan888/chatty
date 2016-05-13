import {
    JOIN_ROOM,
    CREATE_MESSAGE,
    NEW_MESSAGE,
    SOME_USER_TYPING,
    CLEAR_USER_TYPING,
    USER_JOINED_ROOM,
    USER_LEFT_ROOM
} from '../actions/chat_actions';

const INITIAL_STATE = {
    messages: [],
    users: [],
    roomId:null,
    roomName: null,
    roomNotFound:false,
    joined: false,
    typingUserList: [],
    onlineUsers:[]
};

export default function (state = INITIAL_STATE, action){

    let messages = [];

    switch (action.type) {

    /**
     * User is joining room
     */
        case JOIN_ROOM:

            if (action.payload.status == 'ROOM_NOT_FOUND') {
                return Object.assign({}, state, {roomNotFound: true});
            }

            messages = action.payload.messages ? action.payload.messages : [];
            messages.reverse();

            return Object.assign({}, state, {
                messages: [...messages],
                roomId: action.payload.roomId,
                roomName: action.payload.room.name,
                joined: true,
                onlineUsers: action.payload.onlineUsers
            });

    /**
     * In case user creates message or someone else creates message
     */
        case CREATE_MESSAGE:
        case NEW_MESSAGE:

            let message = action.payload.message;
            messages = [...state.messages, message];

            return Object.assign({}, state, {messages: messages});

    /**
     * If someone is typing
     */
        case SOME_USER_TYPING:

            let nicknames = state.typingUserList;
            let typingNickname = action.payload.user.nickname;
            let nicknameInList = false;
            nicknames.forEach(function(nickname, i){
                if (nickname == typingNickname) {
                    nicknameInList = true;
                }
            });

            if (!nicknameInList) {
                nicknames = nicknames.concat(typingNickname);
            }

            return Object.assign({}, state, {typingUserList:nicknames});

    /**
     * If someone stopped typing
     */
        case CLEAR_USER_TYPING:
            return Object.assign({}, state, {typingUserList:[]});

    /**
     * If someone else is joined the chat
     */
        case USER_JOINED_ROOM:

            let found = state.onlineUsers.find(function(user){
                return user.nickname == action.payload.user.nickname
            });

            if (!found) {
                return Object.assign({}, state, {onlineUsers:[...state.onlineUsers, action.payload.user]});
            }

            return state;
    /**
     * If someone left the chat
     */
        case USER_LEFT_ROOM:
            let filteredUsers = state.onlineUsers.filter(function(user){
                return user.nickname != action.payload.user.nickname;
            });

            return Object.assign({}, state, {onlineUsers:filteredUsers});
        default:
            return state;
    }
};
