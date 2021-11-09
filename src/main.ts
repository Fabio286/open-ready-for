import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import { writeError, writeTrace } from '@fabio286/simplogs';
import routes from './routes';

const server = require('https');
const port = 9833;

const app = express();
app.locals.baseDir = path.join(__dirname, '../');
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(routes);

const serverInstance = server.createServer({
   key: fs.readFileSync(`${app.locals.baseDir}/certs/selfsigned.key`),
   cert: fs.readFileSync(`${app.locals.baseDir}/certs/selfsigned.crt`),
   requestCert: false,
   rejectUnauthorized: false
}, app);

serverInstance.listen(port, () => {
   writeTrace(`HTTPS server listening on ${port} port`);
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
