import normalize from '@modules/cards/utils/normalize';

describe('normalize', () => {
  it('should return the string without special characters', () => {
    const str = 'rødz';
    const normalizedStr = normalize(str);
    expect(normalizedStr).toBe('rodz');
  });
  it('should return the string without accents', () => {
    const str = 'joão';
    const normalizedStr = normalize(str);
    expect(normalizedStr).toBe('joao');
  });
  it('should return the string in lowercase', () => {
    const str = 'JOHN';
    const normalizedStr = normalize(str);
    expect(normalizedStr).toBe('john');
  });
});
