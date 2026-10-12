import { celebrate, Segments, Joi } from 'celebrate';

const updateCardValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().hex().length(24).required()
  },
  [Segments.BODY]: {
    quantity: Joi.number().min(0).integer(),
    priceInBrazilianReal: Joi.number().min(0.0)
  }
});
export default updateCardValidator;
