export function isNil(obj: any): obj is null | undefined {
  return isUndefined(obj) || obj === null;
}

export function isUndefined(obj: any): obj is undefined {
  return typeof obj === 'undefined';
}
