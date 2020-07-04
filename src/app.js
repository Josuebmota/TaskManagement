import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Yup from 'yup';
import 'express-async-errors';

import routes from './routes';
import deleteImage from './utils/functions/deleteImage';

import 'dotenv/config';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.execptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  execptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        deleteImage(req);

        return res.status(400).json(errorMessages);
      }

      if (process.env.NODE_ENV === 'development') {
        const erros = await new Youch(err, req).toJSON();

        deleteImage(req);
        return res.status(500).json(erros);
      }

      deleteImage(req);
      return res.status(500).json({ errr: 'Internal server error' });
    });
  }
}

export default new App().server;
