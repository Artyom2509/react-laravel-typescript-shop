import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllStatus = () => {
	return client.query('status');
};

export const currentStatus = (id: number) => {
	return client.query(`status/${id}`);
};

export const addStatus = (data: ReqData, token: string) => {
	return client.query(`edit/status`, { data, method: 'post' }, token);
};

export const updateStatus = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/status/${id}`, { data, method: 'put' }, token);
};

export const removeStatus = (id: number, token: string) => {
	return client.query(`edit/status/${id}`, { method: 'delete' }, token);
};
