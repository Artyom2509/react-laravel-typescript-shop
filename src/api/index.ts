import * as User from './functions/User';
import * as Products from './functions/Products';
import * as Order from './functions/Order';
import * as Category from './functions/Category';
import * as Colors from './functions/Colors';
import * as Brands from './functions/Brands';
import * as Images from './functions/Images';
import * as Delivery from './functions/Delivery';
import * as Coupons from './functions/Coupons';
import * as Payment from './functions/Payment';
import * as Reviews from './functions/Reviews';
import * as Status from './functions/Status';
export * from './functions/User';

export type Api = { [key: string]: any };

const api: Api = Object.assign(
	{},
	User,
	Order,
	Products,
	Category,
	Colors,
	Brands,
	Images,
	Payment,
	Delivery,
	Coupons,
	Reviews,
	Status
);

export default api;
