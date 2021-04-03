import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const login = (data: ReqData) => {
	return client.query('login', { method: 'post', data });
};

export const changePassword = (data: ReqData, token: string) => {
	return client.query('profile/password', { method: 'put', data }, token);
};

export const updateInfo = (data: ReqData, token: string) => {
	return client.query('profile/info-update', { method: 'put', data }, token);
};

export const changeAvatar = (data: ReqData, token: string) => {
	return client.query('profile/avatar', { method: 'post', data }, token);
};

export const authenticate = (token: string) => {
	return client.query(
		'authenticate',
		{ method: 'post', data: { token } },
		token
	);
};

export const register = (data: ReqData) => {
	return client.query('register', {
		method: 'post',
		data,
		headers: {
			'Contetnt-Type': 'multipart/form-data',
		},
	});
};

export const profile = (token: string) => {
	return client.query('profile', {}, token);
};

export const profileWishlist = (token: string) => {
	return client.query('profile/wishlist', {}, token);
};

export const toggleWishlist = (product_id: number, token: string) => {
	return client.query(
		'wishlist/toggle',
		{ data: { product_id }, method: 'post' },
		token
	);
};
