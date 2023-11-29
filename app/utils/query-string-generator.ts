/* eslint-disable @typescript-eslint/no-explicit-any */
import {pickBy} from 'lodash';

export const serialize = (params: object | any) => {
  const prms: Array<string | number> = [];

  Object.entries(pickBy(params, item => item !== undefined)).forEach(([key, value]: Array<number>) => {
    if (typeof params[key] === 'object') {
      params[key].forEach((item: string | number) => {
        prms.push(`${key}=${item}`);
      });
    } else {
      prms.push(`${key}=${value}`);
    }
  });
  return prms.join('&');
};
