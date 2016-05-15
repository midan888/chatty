import env from '../../../env';
import io from 'socket.io-client';

class SocketClient {

    static connect() {
        var connection = io(env.socket_host);
        var that = this;

        if (connection.connected) {
            that.connected();
        }

        var status = null;
        setInterval(function () {
            if (connection.connected && status != true) {
                that.connected();
                status = true;
            } else if (!connection.connected && status != false){
                that.disconnected();
                status = false;
            }
        },400);

        connection.on('online', function () {
            // online
        });

        this.connection = connection;

        return connection;
    }

    static emit(event, payload) {

        if (!this.connection) {
            return;
        }

        var that = this;

        return new Promise(function(resolve){

            if (!payload) {
                payload = {};
            }

            payload.token = localStorage.getItem('auth_token');

            that.connection.on(event, resolve);
            that.connection.emit(event, payload);

        });
    }

    static listenForever(event) {

        var connection = this.connection;

        var promise = {
            resolve:null,
            then: function (resolve) {
                this.resolve = resolve;
            }
        };

        connection.on(event, function(data){
            promise.resolve(data);
        });

        return promise;
    }

    static connected() {}

    static disconnected() {}
}

export default SocketClient;

