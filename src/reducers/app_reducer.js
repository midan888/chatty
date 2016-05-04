
import { APP_OFFLINE, APP_ONLINE } from '../actions/app_actions';

const INITIAL_STATE = {
    online: false
};

export default function (state = INITIAL_STATE, action){

    switch (action.type) {
        case APP_ONLINE:
            return Object.assign({}, state, {online: true});
        case APP_OFFLINE:
            return Object.assign({}, state, {online: false});
        default:
            return state;
    }
}
