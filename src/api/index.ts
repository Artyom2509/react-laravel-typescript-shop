import * as requests from './functions';

export type Api = { [key: string]: any };

const api: Api = Object.assign({}, requests);

export default api;
