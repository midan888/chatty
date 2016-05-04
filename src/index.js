import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {Router, browserHistory} from 'react-router';
import reducers from './reducers';
import routes from './routes';
import socketClient from './services/socket/client';
import { AUTH_TOKEN_KEY } from './constants/app';
import reduxPromis from 'redux-promise';
import { newMessage } from './actions/chat_actions';
import { appOffline, appOnline } from './actions/app_actions';

const createStoreWithMiddleware = applyMiddleware(reduxPromis)(createStore);
const store = createStoreWithMiddleware(reducers);

const socketConnection = socketClient.connect();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app')
);

socketConnection.on('messages/newMessage', function(data){
    store.dispatch(newMessage(data));
});

socketClient.disconnected = function(){
    store.dispatch(appOffline());
};

socketClient.connected = function(){
    store.dispatch(appOnline());
};
//UserActionCreator.getProfile();
