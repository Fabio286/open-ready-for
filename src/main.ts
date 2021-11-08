import path from 'path';
import express from 'express';
import compression from 'compression';
import { writeError, writeTrace } from '@fabio286/simplogs';
import routes from './routes';

const server = require('http');
const port = 9833;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(routes);

const serverInstance = server.createServer(app);

serverInstance.listen(port, () => {
   writeTrace(`HTTP server listening on ${port} port`);
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
