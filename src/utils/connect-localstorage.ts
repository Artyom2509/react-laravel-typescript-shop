const initialState = {
	products: [],
	total_count: 0,
	total_sum: 0,
};

export const connectLocalStorage = (cart?: object) => {
	if (!cart) {
		if (window.localStorage.getItem('react-cart')) {
			return JSON.parse(window.localStorage.getItem('react-cart')!);
		}
		return initialState;
	}

	return window.localStorage.setItem('react-cart', JSON.stringify(cart));
};

export const removeFromLocalStorage = (name: string) => {
	return window.localStorage.removeItem(name);
};
