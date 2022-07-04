/* eslint-disable @typescript-eslint/no-var-requires */
import { celebrate, Segments, Joi } from 'celebrate';

const updateCardValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
  [Segments.BODY]: {
    quantity: Joi.number().min(0).integer(),
    priceInBrazilianReal: Joi.number().min(0.0)
  }
});
export default updateCardValidator;
