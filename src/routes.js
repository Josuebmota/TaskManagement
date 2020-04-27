import { Router } from 'express';

import UserController from'./app/controllers/UserController';
import SessionController from'./app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = Router();

routes.post('/users',UserController.create);
routes.get('/users',UserController.index)
routes.post('/sessions', SessionController.login);

routes.use(authMiddlewares);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
