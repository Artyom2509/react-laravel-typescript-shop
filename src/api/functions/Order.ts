import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const profileOrders = (token: string) => {
	return client.query('profile/orders', {}, token);
};

export const orderToggle = (id: number, token: string) => {
	return client.query(`orders/${id}/toggle`, { method: 'post' }, token);
};

export const addOrder = (data: ReqData) => {
	return client.query(`create-order`, { method: 'post', data });
};

export const addOrderUser = (data: ReqData) => {
	return client.query(`create-user`, { method: 'post', data });
};
