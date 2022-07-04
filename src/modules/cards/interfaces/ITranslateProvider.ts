export default interface ITranslateProvider {
  translate(payload: string, targetLanguage: string): Promise<string>;
}
