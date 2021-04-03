import {
	IDelivery,
	IPayment,
	OrderData,
	OrderUser,
	ProductInCart,
	ReqData,
} from '../../types';
import { OrderActionType } from '../action-types';

export const addNewOrder = () => ({
	type: OrderActionType.NEW_ORDER,
});

export const createOrderUser = (data: ReqData) => ({
	type: OrderActionType.NEW_USER,
	data,
});

export const orderAdd = (order: OrderData) => ({
	type: OrderActionType.ORDER_ADD,
	order,
});

export const orderClear = () => ({
	type: OrderActionType.ORDER_CLEAR,
});

export const orderAddUser = (user: OrderUser) => ({
	type: OrderActionType.ORDER_ADD_USER,
	user,
});

export const orderAddProducts = (products: ProductInCart[]) => ({
	type: OrderActionType.ORDER_ADD_PRODUCTS,
	products,
});

export const orderAddDelivery = (delivery: IDelivery) => ({
	type: OrderActionType.ORDER_ADD_DELIVERY,
	delivery,
});

export const orderAddPayment = (payment: IPayment) => ({
	type: OrderActionType.ORDER_ADD_PAYMENT,
	payment,
});
