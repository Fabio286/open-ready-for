import path from 'path';
import net from 'net';
import http from 'http';
import express from 'express';
import compression from 'compression';
import { writeError, writeTrace } from '@fabio286/simplogs';
import routes from './routes';

const httpPort = 8080;
const tcpPort = 9833;

const app = express();
app.locals.baseDir = path.join(__dirname, '../');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(routes);

const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
   writeTrace(`HTTP server listening on ${httpPort} port`);
});

const tcpSever = net.createServer();
tcpSever.listen(tcpPort, () => {
   writeTrace(`TCP server listening on ${tcpPort} port`);
});

tcpSever.on('connection', socket => {
   process.env.PHONE_ADDRESS = socket.remoteAddress?.replace('::ffff:', '');
});

// Logging errori non gestiti
process.on('uncaughtException', err => {
   writeError(err.message);
   process.exit();
});
process.on('unhandledRejection', (reason, promise) => {
   writeError(`Unhandled Rejection at: ${promise} reason: ${reason}`);
   process.exit();
});
