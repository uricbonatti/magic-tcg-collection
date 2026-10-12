import Player from '@modules/auth/schemas/Player';
import Card from '@modules/cards/schemas/Card';
import { DataSource, DataSourceOptions } from 'typeorm';
import env from './env';

const mongoConfig = env.MONGO_URL
  ? { url: env.MONGO_URL }
  : {
      port: env.MONGO_PORT,
      host: env.MONGO_HOST,
      username: env.MONGO_USERNAME,
      password: env.MONGO_PASSWORD
    };

export const dataSourceOptions = {
  type: 'mongodb',
  database: 'projetos',
  ...mongoConfig,
  entities: [Player, Card],
  synchronize: true,
  writeConcern: { w: 'majority' },
  logging: false,
  authSource: 'admin'
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);

export default async function orm() {
  console.info('[Database] connection request started');
  try {
    await dataSource.initialize();
    console.info('[Database] connection established ');
  } catch (err) {
    console.log('[Database] connection failed with', err);
    process.exit(1);
  }
}
