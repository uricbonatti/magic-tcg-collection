/* eslint-disable @typescript-eslint/no-explicit-any */
interface Args {
  [key: string]: any;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function deepAccessByString(field: string, obj: any) {
  return field
    .split('.')
    .reduce((prev: any, curr: any) => prev && prev[curr], obj);
}

export function logArgs(args: Args[], fields: string[]): string {
  const splitedArgs = args[0];
  return fields
    .map((field) => {
      const value = deepAccessByString(field, splitedArgs);
      return ` - ${capitalizeFirstLetter(field)}: ${value}`;
    })
    .join('');
}

export default function logfy(
  logString: string,
  args: any[],
  showFields: string[]
): string {
  if (args.length && showFields.length) {
    return `${logString}${logArgs(args, showFields)}`;
  }
  return logString;
}
