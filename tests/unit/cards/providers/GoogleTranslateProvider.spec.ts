import { v2 } from '@google-cloud/translate';

import GoogleTranslateProvider from '@modules/cards/providers/GoogleTranslateProvider';

let provider: GoogleTranslateProvider;

describe('GoogleTranslateProvider', () => {
  beforeEach(() => {
    jest.spyOn(v2, 'Translate').mockImplementation(
      jest.fn().mockImplementation(() => {
        return {
          translate: (payload: string, target: string) => {
            return [payload, target];
          }
        };
      })
    );
    provider = new GoogleTranslateProvider();
  });

  it('should return the tranalation', async () => {
    const translation = await provider.translate('batata', 'en');
    expect(translation).toEqual('batata');
  });
});
