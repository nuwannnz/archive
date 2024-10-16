export const objectToQuery = (param: object) =>
  Object.keys(param)
    .map((k) => `${k}=${(param as any)[k]}`)
    .join("&");
