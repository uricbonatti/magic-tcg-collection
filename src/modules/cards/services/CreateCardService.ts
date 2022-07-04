import MethodLogger from '@shared/utils/MethodLogger';
import { inject, injectable } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';
import ITranslateProvider from '../interfaces/ITranslateProvider';
import Card from '../schemas/Card';
import normalize from '../utils/normalize';

interface IRequest {
  name: string;
  edition: string;
  language: string;
  foil: boolean;
  priceInBrazilianReal: number;
  quantity: number;
  playerId: string;
}

@injectable()
class CreateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
    @inject('TranslateProvider')
    private translateProvider: ITranslateProvider
  ) {}

  @MethodLogger({ showFields: ['playerId', 'name', 'language'] })
  public async run({ language, name, ...rest }: IRequest): Promise<Card> {
    let nameInPortuguese = name;
    if (language !== 'pt') {
      nameInPortuguese = await this.translateProvider.translate(name, 'pt');
    }
    return this.cardsRepository.create({
      language,
      name: normalize(nameInPortuguese),
      ...rest
    });
  }
}

export default CreateCardService;
