import express, { json } from 'express';
import { catchAll } from './3-middleware/error-handle';
import { logRequest } from './3-middleware/log';
import cors from "cors" 
import * as dotenv from 'dotenv'
import { messagesRouter } from './6-controllers/messages-controller';
// dotenv.config({ path: process.env.NODE_ENV === "dev" ? ".env" : ".env.prod" });
dotenv.config({ path: process.env.NODE_ENV === "dev" ? ".env" : ".env" });


const server = express();

server.use(cors())
server.use(json());
server.use(logRequest);

server.use(messagesRouter);

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});