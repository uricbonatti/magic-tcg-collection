const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT || 3333),
  MONGO_URL: process.env.MONGO_URL,
  MONGO_PORT: Number(process.env.MONGO_PORT) || 27017,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  APP_SECRET: process.env.APP_SECRET || 'default',
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
  GOOGLE_TRANSLATE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY
};
// Sem segredo JWT em produção qualquer um poderia forjar tokens: falha ao subir.
if (env.NODE_ENV === 'production' && !process.env.APP_SECRET) {
  throw new Error('APP_SECRET must be set in production');
}

export default env;
