import { container } from 'tsyringe';
import ICardsRepository from '../interfaces/ICardsRepository';
import GoogleTranslateProvider from '../providers/GoogleTranslateProvider';
import CardsRepository from '../repositories/CardsRepository';
import ITranslateProvider from './../interfaces/ITranslateProvider';

container.registerSingleton<ITranslateProvider>(
  'TranslateProvider',
  GoogleTranslateProvider
);

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository
);
