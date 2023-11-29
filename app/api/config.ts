import {AxiosRequestConfig} from 'axios';

export const baseURL = 'https://panel.kingdomsportclub.com/api';
export const Crypto = false;

const multiForm: AxiosRequestConfig = {
  headers: {'Content-Type': 'multipart/formdata'},
};

export {multiForm};
