import {
	AuthReq,
	AuthUser,
	IDelivery,
	IPayment,
	IProduct,
	IWishlist,
	OrderData,
	OrderUser,
	ProductInCart,
	ReqData,
} from '../../types';
import {
	CartActionType,
	OrderActionType,
	SearchActionType,
	UserActionType,
} from '../action-types';
export * from './Auth';
export * from './Cart';
export * from './Order';
export * from './Search';

interface LoginUserSuccess {
	type: UserActionType.LOGIN_USER_SUCCSESS;
	data: { token: string; user: AuthUser };
}

interface RegisterUserSuccess {
	type: UserActionType.REGISTER_USER_SUCCESS;
}

interface LoginUserError {
	type: UserActionType.LOGIN_USER_ERROR;
	error: string;
}

interface RegisterUserError {
	type: UserActionType.REGISTER_USER_ERROR;
	error: string;
}

interface Authenticate {
	type: UserActionType.USER_AUTHENTICATE;
}

export interface LoginUser {
	type: UserActionType.LOGIN_USER;
	data: AuthReq;
}

export interface WishlistToggle {
	type: UserActionType.LOGIN_USER;
	product: IProduct;
}

export interface RegisterUser {
	type: UserActionType.REGISTER_USER;
	data: AuthReq;
}

interface ProductAddToCart {
	type: CartActionType.CART_ADD_PRODUCT;
	product: IProduct;
}

export interface CartAdd {
	type: CartActionType.CART_ADD;
	product: IProduct;
}

export interface CartClear {
	type: CartActionType.CART_CLEAR;
}

export interface CartRemove {
	type: CartActionType.CART_REMOVE;
	productId: number;
}

export interface ProductChangeCount {
	type: CartActionType.CHANGE_COUNT;
	operation: string;
	productId: number;
}

interface ProductRemoveFromCart {
	type: CartActionType.CART_REMOVE_PRODUCT;
	productId: number;
}

interface CalculateCartTotal {
	type: CartActionType.CALCULATE_CART_TOTAL;
}

interface CartProductIncrease {
	type: CartActionType.CART_PRODUCT_INCREASE;
	productId: number;
}

interface CartProductDecrease {
	type: CartActionType.CART_PRODUCT_DECREASE;
	productId: number;
}

interface LogoutUser {
	type: UserActionType.LOGOUT_USER;
}

interface WishlistAdd {
	type: UserActionType.WISHLIST_ADD;
	wishlist: IWishlist;
}

interface OrderAddPayment {
	type: OrderActionType.ORDER_ADD_PAYMENT;
	payment: IPayment;
}

interface OrderAddProducts {
	type: OrderActionType.ORDER_ADD_PRODUCTS;
	products: ProductInCart[];
}

interface OrderAddDelivery {
	type: OrderActionType.ORDER_ADD_DELIVERY;
	delivery: IDelivery;
}

interface OrderAddUser {
	type: OrderActionType.ORDER_ADD_USER;
	user: OrderUser;
}

interface OrderAdd {
	type: OrderActionType.ORDER_ADD;
	order: OrderData;
}

interface OrderClear {
	type: OrderActionType.ORDER_CLEAR;
}

interface SearchProduct {
	type: SearchActionType.SEARCH;
	text: string;
}

export interface AddNewOrder {
	type: OrderActionType.NEW_ORDER;
}

export interface CreateOrderUser {
	type: OrderActionType.NEW_USER;
	data: ReqData;
}

export type Actions =
	| LoginUser
	| WishlistAdd
	| LogoutUser
	| LoginUserSuccess
	| RegisterUser
	| RegisterUserSuccess
	| RegisterUserError
	| OrderClear
	| ProductAddToCart
	| OrderAdd
	| Authenticate
	| CartClear
	| ProductRemoveFromCart
	| CartProductIncrease
	| CartProductDecrease
	| CalculateCartTotal
	| AddNewOrder
	| OrderAddUser
	| CreateOrderUser
	| OrderAddProducts
	| OrderAddPayment
	| OrderAddDelivery
	| SearchProduct
	| LoginUserError;
