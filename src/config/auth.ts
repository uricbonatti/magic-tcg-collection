import env from './env';

export default {
  jwt: {
    secret: env.APP_SECRET,
    expiresIn: '1d'
  }
};
