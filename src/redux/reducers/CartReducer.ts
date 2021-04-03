import { ProductInCart } from '../../types';
import { connectLocalStorage } from '../../utils/connect-localstorage';
import { Actions } from '../action-creators';
import { CartActionType } from '../action-types';

const initialState = connectLocalStorage();

interface State {
	products: Array<ProductInCart>;
	total_count: number;
	total_sum: number;
}

const Cart = (state: State = initialState, action: Actions) => {
	switch (action.type) {
		case CartActionType.CART_CLEAR:
			return { products: [], total_count: 0, total_sum: 0 };

		case CartActionType.CART_ADD_PRODUCT:
			const product = {
				...action.product,
				sum: action.product.price,
				count: 1,
			};
			return { ...state, products: [...state.products, product] };

		case CartActionType.CART_REMOVE_PRODUCT:
			const products = state.products.filter((p) => p.id !== action.productId);
			return { ...state, products };

		case CartActionType.CART_PRODUCT_INCREASE:
			const productInc = setProductCount(
				state.products,
				action.productId,
				'INC'
			);

			return {
				...state,
				products: productInc,
			};

		case CartActionType.CART_PRODUCT_DECREASE:
			const productDec = setProductCount(
				state.products,
				action.productId,
				'DEC'
			);

			return {
				...state,
				products: productDec,
			};

		case CartActionType.CALCULATE_CART_TOTAL:
			const { total_count, total_sum } = state.products.reduce(
				(acc, p) => {
					acc.total_count += p.count;
					acc.total_sum += p.sum;
					return acc;
				},
				{ total_count: 0, total_sum: 0 }
			);
			return { ...state, total_count, total_sum };

		default:
			return state;
	}
};

const setProductCount = (
	products: Array<ProductInCart>,
	id: number,
	type: string
) => {
	const idx = products.findIndex((p) => p.id === id);

	if (type === 'INC') {
		products[idx].count = products[idx].count + 1;
		products[idx].sum = products[idx].count * products[idx].price;
	} else if (type === 'DEC') {
		products[idx].count = products[idx].count - 1;
		products[idx].sum = products[idx].count * products[idx].price;

		if (!products[idx].count) products.splice(idx, 1);
	}

	return products;
};

export default Cart;
