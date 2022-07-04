import replaceSpecialCharacters from 'replace-special-characters';
import removeAccents from 'remove-accents';

export default function normalize(str: string): string {
  const strWithoutSpecialChars = replaceSpecialCharacters(str);
  const srtWithoutAccents = removeAccents(strWithoutSpecialChars);
  return srtWithoutAccents.toLowerCase();
}
