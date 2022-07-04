import env from '@config/env';
import { v2 } from '@google-cloud/translate';
import ITranslateProvider from './../interfaces/ITranslateProvider';

class GoogleTranslateProvider implements ITranslateProvider {
  private translator: v2.Translate;
  constructor() {
    this.translator = new v2.Translate({
      projectId: env.GOOGLE_PROJECT_ID,
      key: env.GOOGLE_TRANSLATE_API_KEY
    });
  }

  public async translate(
    payload: string,
    targetLanguage: string
  ): Promise<string> {
    const [translation] = await this.translator.translate(
      payload,
      targetLanguage
    );
    return translation;
  }
}
export default GoogleTranslateProvider;
