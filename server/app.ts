import express, { Router } from "express";
import { Server } from "http";

import { BASE_ROUTE, SERVER_HOST, SERVER_PORT } from "../config";
import { users } from "./routes/users";
import { makeError } from "./utils/makeError";
import { makeLogger } from "./utils/makeLogger";

const app = express();
const server = new Server(app);
const baseRoute = Router();

app.disable('x-powered-by');

app.use(express.json());
app.use(BASE_ROUTE, baseRoute);

baseRoute.use(makeLogger());
baseRoute.use('/users', users);
baseRoute.use(makeError());

export function start() {
  server.listen(SERVER_PORT, SERVER_HOST);
}

export function stop() {
  server.close();
}