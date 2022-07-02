const env = {
  NODE_ENV: process.env.NODE_ENV,
  PERMISSION_TOKEN: process.env.PERMISSION_TOKEN || 'default',
  PORT: Number(process.env.PORT || 3333),
  MONGO_PORT: Number(process.env.MONGO_PORT || 27017),
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD
};
export default env;
