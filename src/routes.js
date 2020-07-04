import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

import authMiddlewares from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/users', upload.single('image'), UserController.store);
routes.post('/sessions', SessionController.login);

routes.use(authMiddlewares);

routes.get('/profile',ProfileController.index)

routes.put('/users', upload.single('image'), UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/tasks',TaskController.store)
routes.get('/tasks',TaskController.index)
routes.put('/tasks',TaskController.update)
routes.delete('/tasks',TaskController.delete)

export default routes;
