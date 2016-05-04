
export const APP_ONLINE = 'APP_ONLINE';
export const APP_OFFLINE = 'APP_OFFLINE';

export function appOnline() {

    return {
        type: APP_ONLINE
    }
}

export function appOffline() {

    return {
        type: APP_OFFLINE
    }
}