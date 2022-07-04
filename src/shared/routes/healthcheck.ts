import { Router } from 'express';

const healthcheck = Router();

healthcheck.get('/', (_, res) => res.status(200).send('ok'));

export default healthcheck;
