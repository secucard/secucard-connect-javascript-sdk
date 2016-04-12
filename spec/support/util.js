import {Promise as ES6Promise} from 'es6-promise';
import Hapi from 'hapi';

var runHttpServer = function(connection, routes) {
        
    return new Promise((resolve, reject) => {
        
        // create the server
        let server = new Hapi.Server();
        let _connection = Object.assign({
            host: 'localhost',
            port: 9000
        }, connection); 
        
        server.connection(_connection);
        
        server.route(routes);
        
        server.start(function () {
            console.log(`Running on ${_connection.host}:${_connection.port}`);
            resolve(true);
        });
        
    });
    
};

let util = {
    runHttpServer: runHttpServer
};

export default util;
