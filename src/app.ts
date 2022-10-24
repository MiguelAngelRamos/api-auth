process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express from 'express';
import { loadControllers } from 'awilix-express';

const app: express.Application = express();

app.use(express.json());

export { app };