import { UserActionType } from '../action-types';
import { Actions } from '../action-creators';
import { IContacts, IWishlist } from '../../types';

interface IAuthReducer {
	loading: boolean;
	error: null | string;
	token: null | string;
	user: {
		id: null | number;
		avatar: null | string;
		first_name: null | string;
		last_name: null | string;
		full_name: null | string;
		email: null | string;
		wishlist: null | IWishlist;
		role: null | string;
		contacts: null | IContacts;
		created_at: null | string;
		updated_at: null | string;
	};
}

const initialState: IAuthReducer = {
	loading: false,
	error: null,
	token: null,
	user: {
		id: null,
		avatar: null,
		first_name: null,
		last_name: null,
		full_name: null,
		email: null,
		wishlist: null,
		contacts: null,
		role: null,
		created_at: null,
		updated_at: null,
	},
};

const AuthReducer = (state = initialState, action: Actions): IAuthReducer => {
	switch (action.type) {
		case UserActionType.LOGIN_USER:
			return {
				loading: true,
				error: null,
				token: null,
				user: { ...state.user },
			};

		case UserActionType.LOGOUT_USER:
			return {
				loading: false,
				error: null,
				token: null,
				user: {
					id: null,
					avatar: null,
					first_name: null,
					last_name: null,
					full_name: null,
					email: null,
					contacts: null,
					wishlist: null,
					role: null,
					created_at: null,
					updated_at: null,
				},
			};

		case UserActionType.LOGIN_USER_ERROR:
			return {
				loading: false,
				error: action.error,
				token: null,
				user: { ...state.user },
			};

		case UserActionType.LOGIN_USER_SUCCSESS:
			return {
				loading: false,
				error: null,
				token: action.data.token,
				user: { ...state.user, ...action.data.user },
			};

		case UserActionType.REGISTER_USER:
			return {
				loading: true,
				error: null,
				token: null,
				user: { ...state.user },
			};

		case UserActionType.REGISTER_USER_ERROR:
			return { ...state, error: action.error, loading: false };

		case UserActionType.WISHLIST_ADD:
			return { ...state, user: { ...state.user, wishlist: action.wishlist } };

		case UserActionType.REGISTER_USER_SUCCESS:
			return { ...state, loading: false };

		default:
			return state;
	}
};

export default AuthReducer;
