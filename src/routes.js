import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import MailController from './app/controllers/MailController';

import UserController from './app/controllers/UserController';
import User from './app/schemas/User';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/mail/:tipo', MailController.store);

export default routes;
