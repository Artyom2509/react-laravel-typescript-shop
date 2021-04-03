import { AxiosClient } from '../client';
import { ReqData } from '../../types';

const client = new AxiosClient();

export const fetchProductImages = (id: number) => {
	return client.query(`products/${id}/images`);
};

export const removeImage = (id: number, token: string) => {
	return client.query(`edit/images/${id}`, { method: 'delete' }, token);
};

export const addImage = (data: ReqData, token: string) => {
	return client.query(`edit/images`, { method: 'post', data }, token);
};
