import { SET_NICKNAME, GET_PROFILE } from '../actions/user_actions';
import { AUTH_TOKEN_KEY } from '../constants/app';


const INITIAL_STATE = {
    data: null,
    nickname: null,
    authToken: localStorage.getItem(AUTH_TOKEN_KEY)
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case SET_NICKNAME:
            localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
            return Object.assign({}, state, {authToken: action.payload.token, nickname: action.payload.nickname});
        case GET_PROFILE:
            return Object.assign({}, state, {nickname: action.payload.nickname});

        default:
            return state;
    }
}
