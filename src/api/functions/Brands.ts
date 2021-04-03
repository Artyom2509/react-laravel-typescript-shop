import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllBrands = () => {
	return client.query('brands');
};

export const currentBrand = (id: number) => {
	return client.query(`brands/${id}`);
};

export const addBrand = (data: ReqData, token: string) => {
	return client.query(`edit/brands`, { data, method: 'post' }, token);
};

export const updateBrand = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/brands/${id}`, { data, method: 'put' }, token);
};

export const removeBrand = (id: number, token: string) => {
	return client.query(`edit/brands/${id}`, { method: 'delete' }, token);
};
