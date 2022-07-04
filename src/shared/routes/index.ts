import { Router } from 'express';

import healthcheck from './healthcheck';
import authRoutes from '../../modules/auth/routes/authRoutes';
import ensureAuthenticated from '@modules/auth/middlewares/ensureAuthenticated';
import cardRoutes from '@modules/cards/routes/cardRoutes';

const routes = Router();
routes.use('/', authRoutes);
routes.use('/healthcheck', healthcheck);
routes.use('/', authRoutes);
routes.use(ensureAuthenticated);
routes.use('/cards', cardRoutes);

export default routes;
