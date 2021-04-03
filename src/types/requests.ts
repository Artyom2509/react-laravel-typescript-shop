import { AxiosResponse } from "axios";
import { IProductInOrder } from "./essential";

export interface AuthReq {
	first_name?: string;
	last_name?: string;
	avatar?: string | null;
	email?: string;
	phone?: string;
	city?: string;
	address?: string;
	password?: string;
	password_confirm?: string;
}

export type ReqData = AuthReq | FormData;
export type ResData = AxiosResponse;

export type OrderDataType = {
	payment_id: number;
	user_id: number;
	products: IProductInOrder;
};
