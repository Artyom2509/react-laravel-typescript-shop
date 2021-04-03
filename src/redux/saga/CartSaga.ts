import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { CartAdd, CartRemove, ProductChangeCount } from '../action-creators';
import { CartActionType } from '../action-types';
import { OperationType } from '../../types';
import {
	addProductInCart,
	calculateCartTotal,
	cartProductDecrease,
	cartProductIncrease,
	removeProductFromCart,
} from '../action-creators/Cart';
import { connectLocalStorage, removeFromLocalStorage } from '../../utils/connect-localstorage';
import { RootState } from '../reducers';

function* productChangeCountWorker(action: ProductChangeCount) {
	if (action.operation === OperationType.INC) {
		yield put(cartProductIncrease(action.productId));
	} else if (action.operation === OperationType.DEC) {
		yield put(cartProductDecrease(action.productId));
	}

	yield put(calculateCartTotal());
	const cart: RootState = yield select((state) => state.cart);
	yield call(connectLocalStorage, cart);
}

function* cardAddWorker(action: CartAdd) {
	yield put(addProductInCart(action.product));
	yield put(calculateCartTotal());
	const cart: RootState = yield select((state) => state.cart);
	yield call(connectLocalStorage, cart);
}

function* cardRemoveWorker(action: CartRemove) {
	yield put(removeProductFromCart(action.productId));
	yield put(calculateCartTotal());
	const cart: RootState = yield select((state) => state.cart);
	yield call(connectLocalStorage, cart);
}

function* cardClearWorker() {
	yield call(removeFromLocalStorage, 'react-cart');
}

export function* CartWatcher() {
	yield takeEvery(CartActionType.CART_ADD, cardAddWorker);
	yield takeEvery(CartActionType.CART_REMOVE, cardRemoveWorker);
	yield takeEvery(CartActionType.CART_CLEAR, cardClearWorker);
	yield takeEvery(CartActionType.CHANGE_COUNT, productChangeCountWorker);
}
