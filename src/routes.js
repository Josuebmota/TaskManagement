import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ForgotPasswordController from './app/controllers/ForgotPasswordController';
import ResetPasswordController from './app/controllers/ResetPasswordController';
import ProfileController from './app/controllers/ProfileController';
import TaskController from './app/controllers/TaskController';

import authMiddlewares from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/users', upload.single('image'), UserController.store);
routes.post('/sessions', SessionController.login);
routes.post('/forgot', ForgotPasswordController.forgot);
routes.post('/reset', ResetPasswordController.reset);

routes.use(authMiddlewares);

routes.get('/profile', ProfileController.index);

routes.put('/users', upload.single('image'), UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;
