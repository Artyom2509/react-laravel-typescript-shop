import axios, { AxiosRequestConfig } from 'axios';

type Config = AxiosRequestConfig;

export interface Client {
	client: any;
	query: (url: string, config: Config) => Promise<any>;
}

export class AxiosClient implements Client {
	public client = axios;

	query = (url: string, config?: AxiosRequestConfig, token?: string) => {
		const headerWithToken = token && {headers: { Authorization: `Bearer ${token}` }}

		return this.client.request({
			url: process.env.REACT_APP_API_URL + url,
			responseType: 'json',
			withCredentials: true,
			...config,
			...headerWithToken,
		});
	};
}
