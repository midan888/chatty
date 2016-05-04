import socketClient from '../services/socket/client';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const JOIN_ROOM = 'JOIN_ROOM';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const USER_TYPING = 'USER_TYPING';
export const SOME_USER_TYPING = 'SOME_USER_TYPING';
export const CLEAR_USER_TYPING = 'CLEAR_USER_TYPING';

export function createMessage(roomId, message) {

    var request = socketClient.emit('messages/create', {
        message: {
            text: message
        },
        roomId
    });

    return {
        type: CREATE_MESSAGE,
        payload: request
    }
}

export function joinRoom(roomId) {

    var request = socketClient.emit('room/join', {roomId});

    return {
        type: JOIN_ROOM,
        payload: request
    }
}

export function newMessage(data) {

    return {
        type: NEW_MESSAGE,
        payload: data
    }
}

export function userTyping(roomId) {

    socketClient.emit('messages/typing', {
        roomId:roomId
    });

    return {
        type: USER_TYPING
    }
}

export function listenUserTyping() {

    var request = socketClient.listenForever('messages/typing');

    return {
        type: SOME_USER_TYPING,
        payload:request
    }
}

export function clearUserTypings() {

    return {
        type: CLEAR_USER_TYPING
    }
}