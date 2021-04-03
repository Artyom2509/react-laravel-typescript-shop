import { call, put, takeEvery, select } from '@redux-saga/core/effects';
import { UserActionType } from '../action-types';
import api from '../../api';
import { LoginUser, RegisterUser, WishlistToggle } from '../action-creators';
import { success, error, info } from 'react-notification-system-redux';
import { RootState } from '../reducers';
import { IWishlist } from '../../types';
import { AxiosResponse } from 'axios';

const loginUserWorker = function* (action: LoginUser) {
	try {
		const { data } = yield call(api.login, action.data);
		yield put({ type: UserActionType.LOGIN_USER_SUCCSESS, data });
		yield put(info({ message: `Welcome ${data.user.full_name}` }));
		localStorage.setItem('access-token', data.token);
	} catch (err) {
		yield put({ type: UserActionType.LOGIN_USER_ERROR, error: err.message });
		yield put(error({ message: err.message }));
	}
};

const authenticateWorker = function* () {
	const token = localStorage.getItem('access-token');

	if (token) {
		const { data } = yield call(api.authenticate, token);
		yield put({ type: UserActionType.LOGIN_USER_SUCCSESS, data });
	}
};

const registerUserWorker = function* (action: RegisterUser) {
	try {
		const { data: res } = yield call(api.register, action.data);
		yield put({ type: UserActionType.REGISTER_USER_SUCCESS });
		yield put(
			success({
				message: `${res.first_name} ${res.last_name} was created! Please try to login.`,
			})
		);
	} catch (err) {
		console.log('err', err);
		yield put({ type: UserActionType.REGISTER_USER_ERROR, error: err.message });
		yield put(error({ message: err.message }));
	}
};

const logoutUserWorker = function* () {
	yield put(error({ message: 'Logout successful' }));
	localStorage.removeItem('access-token')
};

const wishlistToggle = function* (action: WishlistToggle) {
	const {
		auth: { token },
	}: RootState = yield select();

	if (!token) {
		yield put(error({ message: 'You are not authorized' }));
		return;
	}

	try {
		yield call(api.toggleWishlist, action.product.id, token);
		const res: AxiosResponse<IWishlist> = yield call(
			api.profileWishlist,
			token
		);
		yield put({ type: UserActionType.WISHLIST_ADD, wishlist: res.data });
	} catch ({ message }) {
		yield put(error({ message }));
	}
};

export const UserWatcher = function* () {
	yield takeEvery(UserActionType.USER_AUTHENTICATE, authenticateWorker);
	yield takeEvery(UserActionType.LOGIN_USER, loginUserWorker);
	yield takeEvery(UserActionType.LOGOUT_USER, logoutUserWorker);
	yield takeEvery(UserActionType.REGISTER_USER, registerUserWorker);
	yield takeEvery(UserActionType.WISHLIST_TOGGLE, wishlistToggle);
};
