import { ReqData } from '../../types';
import { AxiosClient } from '../client';

const client = new AxiosClient();

export const fetchAllReviews = (token: string) => {
	return client.query('edit/reviews', {}, token);
};

export const currentReview = (id: number, token: string) => {
	return client.query(`edit/reviews/${id}`, {}, token);
};

export const addReview = (data: ReqData, token: string) => {
	return client.query(`edit/reviews`, { data, method: 'post' }, token);
};

export const updateReview = (id: number, data: ReqData, token: string) => {
	return client.query(`edit/reviews/${id}`, { data, method: 'put' }, token);
};

export const removeReview = (id: number, token: string) => {
	return client.query(`edit/reviews/${id}`, { method: 'delete' }, token);
};

export const toggleReviewActive = (id: number, token: string) => {
	return client.query(`reviews/${id}/toggle`, { method: 'post' }, token);
};

export const addProductReview = (data: ReqData) => {
	return client.query(`product/review`, {
		method: 'post',
		data,
	});
};
