
import { CREATE_ROOM, DELETE_ROOM } from '../actions/room_actions';

const INITIAL_STATE = {
    data: null,
    deleted: false
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case CREATE_ROOM:
            return Object.assign({}, state, {data: action.payload.room});
        case DELETE_ROOM:
            return Object.assign({}, state, {deleted: true, data: null});
        default:
            return state;
    }
};
