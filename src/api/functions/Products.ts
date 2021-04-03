import { IProduct } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const productsPaginate = (page: number, count?: number) => {
	return client.query(`products?page=${page}${count && `&count=${count}`}`);
};

export const productsParams = (params: object) => {
	return client.query(`products`, { params });
};

export const currentProduct = (id: number) => {
	return client.query(`products/${id}`);
};

export const productUpdate = (id: number, data: IProduct, token: string) => {
	return client.query(`edit/products/${id}`, { data, method: 'put' }, token);
};

export const productCreate = (data: IProduct, token: string) => {
	return client.query(`edit/products`, { data, method: 'post' }, token);
};
