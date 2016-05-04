import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/base/layout';
import RoomCreate from './components/room/room_create.react';
import ChatPage from './components/chat/chat_page';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={RoomCreate} />
        <Route path="channel/:id/chat" component={ChatPage} />
    </Route>
);