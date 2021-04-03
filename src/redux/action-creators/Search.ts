import { SearchActionType } from '../action-types';

export const searchProduct = (text: string) => ({
	type: SearchActionType.SEARCH,
	text,
});
