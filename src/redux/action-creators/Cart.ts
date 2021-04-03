import { IProduct } from '../../types';
import { CartActionType } from '../action-types';

export const addToCart = (product: IProduct) => ({
	type: CartActionType.CART_ADD,
	product,
});

export const removeFromCart = (productId: number) => ({
	type: CartActionType.CART_REMOVE,
	productId,
});

export const cartClear = () => ({
	type: CartActionType.CART_CLEAR,
});

export const addProductInCart = (product: IProduct) => ({
	type: CartActionType.CART_ADD_PRODUCT,
	product,
});

export const removeProductFromCart = (productId: number) => ({
	type: CartActionType.CART_REMOVE_PRODUCT,
	productId,
});

export const productChangeCount = (productId: number, operation: string) => ({
	type: CartActionType.CHANGE_COUNT,
	operation,
	productId,
});

export const cartProductIncrease = (productId: number) => ({
	type: CartActionType.CART_PRODUCT_INCREASE,
	productId,
});

export const cartProductDecrease = (productId: number) => ({
	type: CartActionType.CART_PRODUCT_DECREASE,
	productId,
});

export const calculateCartTotal = () => ({
	type: CartActionType.CALCULATE_CART_TOTAL,
});
