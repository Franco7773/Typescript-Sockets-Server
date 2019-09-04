import Server from './classes/server';
import router from './routes/router';


import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';


const server = Server.instance;

// BoyParser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json());
// CORS
server.app.use( cors({ origin: true, credentials: true }));
// Morgan
server.app.use( morgan('dev'));

// Routes
server.app.use('/', router);


server.start( () => console.log( `Server Online on PORT: ${ server.port }` ))
