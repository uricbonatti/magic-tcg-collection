import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import signInValidator from '../middlewares/signInValidator';
import signUpValidator from '../middlewares/signUpValidator';

const controller = new AuthController();
const authRoutes = Router();

authRoutes.post('/signup', signUpValidator, controller.signUp);
authRoutes.post('/signin', signInValidator, controller.signIn);

export default authRoutes;
