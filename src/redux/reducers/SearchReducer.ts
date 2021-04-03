import { Actions } from '../action-creators';
import { SearchActionType } from '../action-types';

const initialState = {
	text: '',
};

interface State {
	text: string;
}

const searchReducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case SearchActionType.SEARCH:
			return { ...state, text: action.text };

		default:
			return state;
	}
};

export default searchReducer;
