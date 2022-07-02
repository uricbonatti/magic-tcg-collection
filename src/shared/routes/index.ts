import { Router } from 'express';

import healthcheck from './healthcheck';

const routes = Router();
routes.use('/healthcheck', healthcheck);

export default routes;
