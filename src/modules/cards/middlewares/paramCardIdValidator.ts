/* eslint-disable @typescript-eslint/no-var-requires */
import { celebrate, Segments, Joi } from 'celebrate';

const paramCardIdValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  }
});
export default paramCardIdValidator;
