import { Router } from 'express';

import healthcheck from './healthcheck';
import authRoutes from '../../modules/auth/routes/authRoutes';

const routes = Router();
routes.use('/', authRoutes);
routes.use('/healthcheck', healthcheck);

export default routes;
