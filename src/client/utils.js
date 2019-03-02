import io from 'socket.io-client';
import { createBrowserHistory } from 'history'

export const socket = io(':1337', {
    reconnection: true
});

export const history = createBrowserHistory();