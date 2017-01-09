import socketClient from '../services/socket/client';

export const SET_NICKNAME = 'SET_NICKNAME';
export const GET_PROFILE = 'GET_PROFILE';

export function setNickname(nickname) {

    let request = socketClient.emit('user/setNickname', {
        nickname: nickname
    });

    return {
        type: SET_NICKNAME,
        payload: request
    }
}

export function getProfile() {

    let request = socketClient.emit('user/getProfile');

    return {
        type: GET_PROFILE,
        payload: request
    }
}
