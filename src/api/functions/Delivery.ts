import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllDelivery = () => {
	return client.query('delivery');
};

export const currentDelivery = (id: number) => {
	return client.query(`delivery/${id}`);
};

export const addDelivery = (data: ReqData, token: string) => {
	return client.query(`edit/delivery`, { data, method: 'post' }, token);
};

export const updateDeliveryImage = (
	id: number,
	data: ReqData,
	token: string
) => {
	return client.query(`delivery/${id}/image`, { data, method: 'post' }, token);
};

export const updateDelivery = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/delivery/${id}`, { data, method: 'put' }, token);
};

export const removeDelivery = (id: number, token: string) => {
	return client.query(`edit/delivery/${id}`, { method: 'delete' }, token);
};
