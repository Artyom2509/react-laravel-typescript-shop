export interface Todo {
	id?: number;
	title?: string;
	done?: boolean;
}

export interface ISingle {
	[x: string]: string | number;
}

export interface IUser {
	avatar?: string;
	name: string;
	created_at?: string;
	progress?: string | number;
}

export interface OrderUser {
	id: number | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
	email: string | null;
	contacts: IContacts;
}

export interface IProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	old_price: number;
	quantity: number;
	sold: number;
	model_year: string;
	category: ICategory;
	sub: ISub | null;
	color: IColor;
	reviews: IReview[];
	rating: number;
	new: string;
	favorite: string;
	hot_deal: string;
	images: IPicture[];
	brand: Ibrand;
	created_at: string;
	updated_at: string;
}

export interface IColor {
	id: number;
	name: string;
	code: string;
	created_at: string;
	updated_at: string;
}

export interface ICategory {
	id: number;
	name: string;
	subs: ISub[];
	created_at: string;
	updated_at: string;
}

export interface ISub {
	id: number;
	category_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface IReview {
	id: number;
	product_id: number;
	name: string;
	email: string;
	text: string;
	rating: number;
	status: number;
	created_at: string;
	updated_at: string;
}

export interface Ibrand {
	id: number;
	name: string;
	logo: string;
	description: string;
}

export interface IPicture {
	id: number;
	product_id: number;
	url: string;
	url_small: string;
	created_at: string;
	updated_at: string;
}

export interface IProductInOrder {
	id: number;
	product_info: IProduct;
	count: number;
	sum: number;
	created_at: string;
	updated_at: string;
}

export interface IStatus {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ICoupon {
	id: number;
	code: string;
	is_enabled: number;
	value: number;
	created_at: string;
	updated_at: string;
}

export interface IPayment {
	id: number;
	title: string;
	image: string;
	description: string;
	value: number;
	created_at: string;
	updated_at: string;
}

export interface IOrder {
	id: number | null;
	products: Array<IProductInOrder | ProductInCart>;
	status?: IStatus;
	user: AuthUser;
	delivery: IDelivery | null;
	payment: IPayment | null;
	coupon: ICoupon | null;
	total_sum: number;
	total_count: number;
	total_after_discount: number;
	with_delivery: number;
	abort?: boolean;
	created_at?: string | null;
	updated_at?: string | null;
}

export interface OrderData {
	id?: number | null;
	products?: Array<IProductInOrder | ProductInCart>;
	status?: IStatus;
	user?: AuthUser;
	delivery?: IDelivery | null;
	payment?: IPayment | null;
	coupon?: ICoupon | null;
	total_sum?: number;
	total_count?: number;
	total_after_discount?: number;
	with_delivery?: number;
	abort?: boolean;
	created_at?: string | null;
	updated_at?: string | null;
}

export interface IDelivery {
	id: number;
	title: string;
	description: string;
	price: number;
	image: string;
	created_at: string;
	updated_at: string;
}

export interface IWishlist {
	id: number;
	products: IProduct[];
	total_sum: number;
	created_at: string;
	updated_at: string;
}

export interface IContacts {
	phone: string | null;
	address: string | null;
	city: string | null;
}

export interface ProductInCart extends IProduct {
	count: number;
	sum: number;
	product_info?: null | IProduct
}

export interface AuthUser {
	id: number | null;
	avatar: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
	email: string | null;
	role: string | null;
	contacts: IContacts | null;
	created_at?: string | null;
	updated_at?: string | null;
}
