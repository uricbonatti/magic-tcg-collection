import { celebrate, Segments, Joi } from 'celebrate';

const signUpValidator = celebrate({
  [Segments.BODY]: {
    password: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    email: Joi.string().email().required()
  }
});

export default signUpValidator;
