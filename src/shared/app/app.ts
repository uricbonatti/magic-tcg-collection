import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import corsConfig from '@config/cors';
import errorHandler from '../errors/errorHandler';
import routes from '../routes';

function app() {
  const expressApp = express();
  expressApp.use(cors(corsConfig));
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(routes);
  expressApp.use(errorHandler);
  return expressApp;
}

export default app();
