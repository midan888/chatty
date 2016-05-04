import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import roomReducer from './room_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';
import appReducer from './app_reducer';

const rootReducer = combineReducers({
    room: roomReducer,
    user: userReducer,
    form: formReducer,
    chat: chatReducer,
    app: appReducer
});

export default rootReducer;