import { all } from 'redux-saga/effects';
import { UserWatcher } from './UserSaga';
import { CartWatcher } from './CartSaga';

export default function* rootSaga() {
	yield all([UserWatcher(), CartWatcher()]);
}
