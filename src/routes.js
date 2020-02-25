import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/Users', UserController.store);
routes.post('/Session', SessionController.store);

routes.use(authMiddleware);

routes.put('/Users', UserController.update);

routes.post('/Recipients', RecipientController.store);
routes.put('/Recipients/:id', RecipientController.update);

routes.get('/Courier', CourierController.index);
routes.post('/Courier', CourierController.store);

routes.post('/Files', upload.single('file'), FileController.store);

routes.post('/Orders', OrderController.store);
routes.get('/Orders', OrderController.index);

export default routes;
