import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import auth from './UserReducer';
import cart from './CartReducer';
import order from './OrderReducer';
import search from './SearchReducer';

const rootReducer = combineReducers({
	auth,
	cart,
	order,
	search,
	notifications,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
