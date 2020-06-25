import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import ConfigController from './app/controllers/ConfigController';

import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import MailController from './app/controllers/MailController';

import UserController from './app/controllers/UserController';
import User from './app/schemas/User';

import TeamController from './app/controllers/TeamController';
import PositionController from './app/controllers/PositionsController';
import TagController from './app/controllers/TagController';
import ContactController from './app/controllers/ContactController';
import NewsController from './app/controllers/NewsController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);

routes.post('/config', ConfigController.store);
routes.get('/config', ConfigController.index);

routes.post('/position', PositionController.store);
routes.delete('/position/:id', PositionController.delete);
routes.get('/position', PositionController.index);

routes.post('/team', TeamController.store);
routes.put('/team/:id', TeamController.update);
routes.delete('/team/:id', TeamController.delete);
routes.get('/team/:id', TeamController.show);
routes.get('/team', TeamController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/mail/:tipo', MailController.store);

routes.post('/tag', TagController.store);
routes.delete('/tag/:id', TagController.delete);
routes.get('/tag', TagController.index);

routes.post('/contact', ContactController.store);
routes.put('/contact/:id', ContactController.update);
routes.delete('/contact/:id', ContactController.delete);
routes.get('/contact/:id', ContactController.show);
routes.get('/contact', ContactController.index);

routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);
routes.get('/news/:id', NewsController.show);
routes.get('/news', NewsController.index);

export default routes;
