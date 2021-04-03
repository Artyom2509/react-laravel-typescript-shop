import { AuthReq, IProduct } from '../../types';
import { UserActionType } from '../action-types';

export const loginUser = (data: AuthReq) => ({
	type: UserActionType.LOGIN_USER,
	data,
});

export const authenticate = () => ({
	type: UserActionType.USER_AUTHENTICATE,
});

export const wishlistToggle = (product: IProduct) => ({
	type: UserActionType.WISHLIST_TOGGLE,
	product,
});

export const logoutUser = () => ({
	type: UserActionType.LOGOUT_USER,
});

export const registerUser = (data: FormData) => ({
	type: UserActionType.REGISTER_USER,
	data,
});
