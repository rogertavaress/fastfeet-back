import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/Users', UserController.store);
routes.put('/Users', authMiddleware, UserController.update);

routes.post('/Session', SessionController.store);

routes.post('/Recipients', authMiddleware, RecipientController.store);
routes.put('/Recipients/:id', authMiddleware, RecipientController.update);

export default routes;
