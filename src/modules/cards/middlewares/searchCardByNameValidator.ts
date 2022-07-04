/* eslint-disable @typescript-eslint/no-var-requires */
import { celebrate, Segments, Joi } from 'celebrate';

const searchCardByNameValidator = celebrate({
  [Segments.PARAMS]: {
    name: Joi.string().required()
  }
});
export default searchCardByNameValidator;
