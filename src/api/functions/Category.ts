import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllCategory = () => {
	return client.query('category');
};

export const fetchAllSubs = () => {
	return client.query('subs');
};


export const currentCategory = (id: number) => {
	return client.query(`category/${id}`);
};

export const addCategory = (data: ReqData, token: string) => {
	return client.query(`edit/category`, { data, method: 'post' }, token);
};

export const updateCategory = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/category/${id}`, { data, method: 'put' }, token);
};

export const removeCategory = (id: number, token: string) => {
	return client.query(`edit/category/${id}`, { method: 'delete' }, token);
};

export const currentSub = (id: number) => {
	return client.query(`subs/${id}`);
};

export const addSub = (data: ReqData, token: string) => {
	return client.query(`edit/subs`, { data, method: 'post' }, token);
};

export const updateSub = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/subs/${id}`, { data, method: 'put' }, token);
};

export const removeSub = (id: number, token: string) => {
	return client.query(`edit/subs/${id}`, { method: 'delete' }, token);
};
