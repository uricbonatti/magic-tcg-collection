/* eslint-disable @typescript-eslint/no-explicit-any */
import logfy, {
  capitalizeFirstLetter,
  deepAccessByString,
  logArgs
} from '@shared/utils/logfy';

describe('logfy', () => {
  it('should return the same string if there are no args', () => {
    const logString = 'test';
    const args: any[] = [];
    const showFields: string[] = ['test'];
    const result = logfy(logString, args, showFields);
    expect(result).toBe(logString);
  });

  it('should return the same string if there are no fields', () => {
    const logString = 'test';
    const args: any[] = [{ test: true }];
    const showFields: string[] = [];
    const result = logfy(logString, args, showFields);
    expect(result).toBe(logString);
  });

  it('should return the same string if there are no args and no fields', () => {
    const logString = 'test';
    const args: any[] = [];
    const showFields: string[] = [];
    const result = logfy(logString, args, showFields);
    expect(result).toBe(logString);
  });

  it('should return the same string if there are  args and fields', () => {
    const logString = 'test';
    const args: any[] = [{ test: true }];
    const showFields: string[] = ['test'];
    const result = logfy(logString, args, showFields);
    expect(result).toBe('test - Test: true');
  });
});
describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter', () => {
    const string = 'test';
    const result = capitalizeFirstLetter(string);
    expect(result).toBe('Test');
  });
});

describe('deepAccessByString', () => {
  it('should return the value of a simple attribute of object if there are no args', () => {
    const field = 'test';
    const obj = { test: true };
    const result = deepAccessByString(field, obj);
    expect(result).toBe(true);
  });
  it('should return the value of a deep attribute of object if there are no args', () => {
    const field = 'mocked.test';
    const obj = { mocked: { test: true } };
    const result = deepAccessByString(field, obj);
    expect(result).toBe(true);
  });

  it('should return the value of a really deep attribute of object if there are no args', () => {
    const field = 'mocked.test.fake';
    const obj = { mocked: { test: { fake: 'fake' } } };
    const result = deepAccessByString(field, obj);
    expect(result).toBe('fake');
  });
});

describe('logArgs', () => {
  it('should return the same string if there are args and fields', () => {
    const args: any[] = [{ test: true }];
    const fields: string[] = ['test'];
    const result = logArgs(args, fields);
    expect(result).toBe(' - Test: true');
  });
});
