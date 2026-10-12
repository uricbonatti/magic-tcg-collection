import { celebrate, Segments, Joi } from 'celebrate';

const paramCardIdValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().hex().length(24).required()
  }
});
export default paramCardIdValidator;
