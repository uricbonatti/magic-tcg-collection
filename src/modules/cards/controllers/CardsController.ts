import { container } from 'tsyringe';
import { Request, Response } from 'express';
import MethodLogger from '@shared/utils/MethodLogger';
import ListCardsService from '../services/ListCardsService';
import { instanceToPlain } from 'class-transformer';
import UpdateCardService from '../services/UpdateCardService';
import ShowCardService from '../services/ShowCardService';
import SearchCardByNameService from './../services/SearchCardByNameService';
import DeleteCardService from './../services/DeleteCardService';
import CreateCardService from './../services/CreateCardService';

class CardsController {
  @MethodLogger()
  public async index(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const listCards = container.resolve(ListCardsService);
    const cards = await listCards.run({ playerId });
    return res.status(200).json(instanceToPlain(cards));
  }

  @MethodLogger()
  public async show(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const { id } = req.params;
    const showCard = container.resolve(ShowCardService);
    const card = await showCard.run({ playerId, id });
    return res.status(200).json(instanceToPlain(card));
  }

  @MethodLogger()
  public async update(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const { id } = req.params;
    const { quantity, priceInBrazilianReal } = req.body;
    const updateCard = container.resolve(UpdateCardService);
    const card = await updateCard.run({
      playerId,
      id,
      priceInBrazilianReal,
      quantity
    });
    return res.status(200).json(instanceToPlain(card));
  }

  @MethodLogger()
  public async search(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const { name } = req.params;
    const searchCards = container.resolve(SearchCardByNameService);
    const cards = await searchCards.run({ playerId, name });
    return res.status(200).json(instanceToPlain(cards));
  }

  @MethodLogger()
  public async create(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const { name, edition, language, foil, priceInBrazilianReal, quantity } =
      req.body;
    const createCard = container.resolve(CreateCardService);
    const card = await createCard.run({
      playerId,
      name,
      edition,
      foil,
      language,
      priceInBrazilianReal,
      quantity
    });
    return res.status(201).json(instanceToPlain(card));
  }

  @MethodLogger()
  public async delete(req: Request, res: Response): Promise<Response> {
    const playerId = req.player.id;
    const { id } = req.params;
    const deleteCard = container.resolve(DeleteCardService);
    await deleteCard.run({ playerId, id });
    return res.status(204).send();
  }
}

export default CardsController;
