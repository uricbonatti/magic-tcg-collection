export default interface ICreateCardDTO {
  name: string;
  priceInBrazilianReal: number;
  quantity: number;
  edition: string;
  foil: boolean;
  language: string;
  playerId: string;
}
