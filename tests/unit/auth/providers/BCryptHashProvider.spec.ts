import BCryptHashProvider from '@modules/auth/providers/BCryptHashProvider';
import bcryptjs from 'bcryptjs';

let provider: BCryptHashProvider;
describe('BCryptHashProvider', () => {
  beforeEach(() => {
    provider = new BCryptHashProvider();
  });
  it('should be able to hash the payload', async () => {
    const spy = jest.spyOn(bcryptjs, 'hash');
    const payload = 'teste';
    const response = await provider.generateHash(payload);
    console.log(response);
    expect(spy).toHaveBeenCalledWith(payload, 8);
    expect(response).not.toEqual(payload);
  });
  it('should be able compare the payload with hashed string', async () => {
    const spy = jest.spyOn(bcryptjs, 'compare');
    const payload = 'teste';
    const hashedString =
      '$2a$08$MSiQ364JX6C3fSKO/2L2h.AmuzaSL/JcL/dDUJy96JaTgusIUDJHq';
    const response = await provider.compareHash(payload, hashedString);
    expect(spy).toHaveBeenCalledWith(payload, hashedString);
    expect(response).toBeTruthy();
  });
});
