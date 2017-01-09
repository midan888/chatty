import socketClient from '../services/socket/client';

export const CREATE_ROOM = 'CREATE_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';

/**
 * Create new room
 *
 * @param roomName
 * @returns {{type: string, payload: *}}
 */
export function createRoom(roomName) {

    let request = socketClient.emit('rooms/create', {
        room: {
            name:roomName
        }
    });

    return {
        type: CREATE_ROOM,
        payload: request
    }
}

/**
 * Delete room
 *
 * @param roomId
 * @returns {{type: string, payload: *}}
 */
export function deleteRoom(roomId) {

    let request = socketClient.emit('rooms/delete', {
        room: {
            _id:roomId
        }
    });

    return {
        type: DELETE_ROOM,
        payload: request
    }
}