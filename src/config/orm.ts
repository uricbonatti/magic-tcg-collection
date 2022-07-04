/* eslint-disable indent */
import Player from '@modules/auth/schemas/Player';
import Card from '@modules/cards/schemas/Card';
import { ConnectionOptions, createConnection } from 'typeorm';
import env from './env';

const mongoConfig = env.MONGO_URL
  ? { url: env.MONGO_URL }
  : {
      port: env.MONGO_PORT,
      host: env.MONGO_HOST,
      username: env.MONGO_USERNAME,
      password: env.MONGO_PASSWORD
    };

export const connectionOptions = {
  type: 'mongodb',
  database: 'projetos',
  ...mongoConfig,
  entities: [Player, Card],
  useUnifiedTopology: true,
  synchronize: true,
  w: 'majority',
  logging: false,
  useNewUrlParser: true,
  authSource: 'admin'
} as ConnectionOptions;

export default async function orm() {
  console.info('[Database] connection request started');
  try {
    await createConnection(connectionOptions);
    console.info('[Database] connection established ');
  } catch (err) {
    console.log('[Database] connection failed ');
    console.log('[Database] connection failed with', err);
    process.exit(1);
  }
}
