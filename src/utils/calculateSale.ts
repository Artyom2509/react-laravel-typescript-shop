export const calculateSale = (
	oldPice: number,
	price: number,
	digits: number = 0
) => ((oldPice / price) * 100 - 100).toFixed(digits);
