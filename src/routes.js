import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';
import MailController from './app/controllers/MailController';

const routes = new Router();
const upload = multer(multerConfig);

//routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/mail/:tipo', MailController.store);

export default routes;
