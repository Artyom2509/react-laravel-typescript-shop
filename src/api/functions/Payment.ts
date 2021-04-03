import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllPayments = () => {
	return client.query('payments');
};

export const currentPayment = (id: number) => {
	return client.query(`payments/${id}`);
};

export const addPayment = (data: ReqData, token: string) => {
	return client.query(`edit/payments`, { data, method: 'post' }, token);
};

export const updatePaymentImage = (
	id: number,
	data: ReqData,
	token: string
) => {
	return client.query(`payment/${id}/image`, { data, method: 'post' }, token);
};

export const updatePayment = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/payments/${id}`, { data, method: 'put' }, token);
};

export const removePayment = (id: number, token: string) => {
	return client.query(`edit/payments/${id}`, { method: 'delete' }, token);
};
