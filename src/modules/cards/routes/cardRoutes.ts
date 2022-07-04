import { Router } from 'express';
import createCardValidator from '../middlewares/createCardValidator';
import paramCardIdValidator from '../middlewares/paramCardIdValidator';
import searchCardByNameValidator from '../middlewares/searchCardByNameValidator';
import updateCardValidator from '../middlewares/updateCardValidator';
import CardsController from './../controllers/CardsController';

const controller = new CardsController();
const cardRoutes = Router();

cardRoutes.get('/', controller.index);
cardRoutes.get('/search/:name', searchCardByNameValidator, controller.search);
cardRoutes.get('/:id', paramCardIdValidator, controller.show);
cardRoutes.post('/', createCardValidator, controller.create);
cardRoutes.patch('/:id', updateCardValidator, controller.update);
cardRoutes.delete('/:id', paramCardIdValidator, controller.delete);

export default cardRoutes;
