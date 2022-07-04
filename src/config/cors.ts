import { CorsOptions } from 'cors';

export default {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
} as CorsOptions;
