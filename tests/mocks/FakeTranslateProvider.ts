import ITranslateProvider from '@modules/cards/interfaces/ITranslateProvider';

class FakeTranslateProvider implements ITranslateProvider {
  public async translate(
    payload: string,
    targetLanguage: string
  ): Promise<string> {
    return payload + targetLanguage;
  }
}

export default FakeTranslateProvider;
