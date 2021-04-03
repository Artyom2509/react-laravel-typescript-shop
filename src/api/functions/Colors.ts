import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllColors = () => {
	return client.query('colors');
};

export const currentColor = (id: number) => {
	return client.query(`colors/${id}`);
};

export const addColor = (data: ReqData, token: string) => {
	return client.query(`edit/colors`, { data, method: 'post' }, token);
};

export const updateColor = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/colors/${id}`, { data, method: 'put' }, token);
};

export const removeColor = (id: number, token: string) => {
	return client.query(`edit/colors/${id}`, { method: 'delete' }, token);
};
