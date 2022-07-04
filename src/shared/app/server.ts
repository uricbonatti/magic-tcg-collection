import 'reflect-metadata';
import orm from '@config/orm';
import '@config/containers';

import app from './app';
import env from '@config/env';

async function start() {
  await orm();
  app.listen(env.PORT, () => {
    console.info(`[RESTARTING] Server running on port ${env.PORT}`);
  });
}

start();
