import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllCoupons = (token: string) => {
	return client.query('edit/coupons', {}, token);
};

export const currentCoupon = (id: number, token: string) => {
	return client.query(`edit/coupons/${id}`, {}, token);
};

export const addCoupon = (data: ReqData, token: string) => {
	return client.query(`edit/coupons`, { data, method: 'post' }, token);
};

export const updateCoupon = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/coupons/${id}`, { data, method: 'put' }, token);
};

export const removeCoupon = (id: number, token: string) => {
	return client.query(`edit/coupons/${id}`, { method: 'delete' }, token);
};

export const toggleCouponActive = (id: number, token: string) => {
	return client.query(`coupons/${id}/toggle`, { method: 'post' }, token);
};
