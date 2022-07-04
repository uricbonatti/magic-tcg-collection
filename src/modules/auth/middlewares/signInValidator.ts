import { celebrate, Segments, Joi } from 'celebrate';

const signInValidator = celebrate({
  [Segments.BODY]: {
    password: Joi.string().required(),
    email: Joi.string().email().required()
  }
});

export default signInValidator;
