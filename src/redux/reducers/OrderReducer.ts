import {
	ICoupon,
	IDelivery,
	IPayment,
	OrderUser,
	ProductInCart,
} from '../../types';
import { Actions } from '../action-creators';
import { OrderActionType } from '../action-types';

export interface OrderState {
	id: null | number;
	products: ProductInCart[];
	user: OrderUser;
	delivery: IDelivery | null;
	payment: IPayment | null;
	coupon: ICoupon | null;
	total_sum: number;
	total_count: number;
	total_after_discount: number;
	with_delivery: number;
	created_at: null | string;
	updated_at: null | string;
}

const initialState = {
	products: [],
	user: {
		id: null,
		first_name: null,
		last_name: null,
		full_name: null,
		email: null,
		contacts: { phone: null, address: null, city: null },
	},
	id: null,
	delivery: null,
	payment: null,
	coupon: null,
	total_sum: 0,
	total_count: 0,
	total_after_discount: 0,
	with_delivery: 0,
	created_at: null,
	updated_at: null,
};

const orderReducer = (
	state: OrderState = initialState,
	action: Actions
): OrderState => {
	switch (action.type) {
		case OrderActionType.ORDER_CLEAR:
			return {
				products: [],
				user: {
					id: null,
					first_name: null,
					last_name: null,
					full_name: null,
					email: null,
					contacts: { phone: null, address: null, city: null },
				},
				id: null,
				delivery: null,
				payment: null,
				coupon: null,
				total_sum: 0,
				total_count: 0,
				total_after_discount: 0,
				with_delivery: 0,
				created_at: null,
				updated_at: null,
			};

		case OrderActionType.ORDER_ADD_PAYMENT:
			return { ...state, payment: action.payment };

		case OrderActionType.ORDER_ADD_USER:
			return { ...state, user: action.user };

		case OrderActionType.ORDER_ADD:
			return {
				...state,
				id: action.order.id!,
				total_sum: action.order.total_sum!,
				total_count: action.order.total_count!,
				total_after_discount: action.order.total_after_discount!,
				with_delivery: action.order.with_delivery!,
			};

		case OrderActionType.ORDER_ADD_PRODUCTS:
			return { ...state, products: action.products };

		case OrderActionType.ORDER_ADD_DELIVERY:
			return { ...state, delivery: action.delivery };

		default:
			return state;
	}
};

export default orderReducer;
