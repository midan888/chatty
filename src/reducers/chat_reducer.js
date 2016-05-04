import {
    JOIN_ROOM,
    CREATE_MESSAGE,
    NEW_MESSAGE,
    SOME_USER_TYPING,
    CLEAR_USER_TYPING,
} from '../actions/chat_actions';

const INITIAL_STATE = {
    messages: [],
    users: [],
    roomId:null,
    roomName: null,
    roomNotFound:false,
    joined: false,
    typingUserList: []
};

export default function (state = INITIAL_STATE, action){

    let messages = [];

    switch (action.type) {

        case JOIN_ROOM:

            if (action.payload.status == 'ROOM_NOT_FOUND') {
                return Object.assign({}, state, {roomNotFound: true});
            }

            messages = action.payload.messages ? action.payload.messages : [];
            messages.reverse();

            return Object.assign({}, state, {
                messages: messages,
                roomId: action.payload.roomId,
                roomName: action.payload.room.name,
                joined: true
            });

        case CREATE_MESSAGE:
        case NEW_MESSAGE:

            let message = action.payload.message;
            messages = [...state.messages, message];

            return Object.assign({}, state, {messages: messages});

        case SOME_USER_TYPING:

            var nicknames = state.typingUserList;
            var typingNickname = action.payload.user.nickname;
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

        case CLEAR_USER_TYPING:
            return Object.assign({}, state, {typingUserList:[]});

        default:
            return state;
    }
};
