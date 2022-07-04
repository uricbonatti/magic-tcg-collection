/* eslint-disable @typescript-eslint/no-var-requires */
import { celebrate, Segments, Joi } from 'celebrate';

const createCardValidator = celebrate({
  [Segments.BODY]: {
    quantity: Joi.number().min(0).integer().required(),
    priceInBrazilianReal: Joi.number().min(0.0).required(),
    name: Joi.string().required(),
    edition: Joi.string().required(),
    language: Joi.string().valid('pt', 'jp', 'en').required(),
    foil: Joi.boolean().required()
  }
});
export default createCardValidator;
