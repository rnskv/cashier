import io from 'socket.io-client';
import { createBrowserHistory } from 'history'

export const socket = io(':1337', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
});

export const history = createBrowserHistory();