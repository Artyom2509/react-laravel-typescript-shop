export enum TagTypes {
	a = 'a',
	div = 'div',
	img = 'img',
	span = 'span',
	ReactNode = 'ReactNode',
	h1 = 'h1',
	h2 = 'h2',
	h3 = 'h3',
	h4 = 'h4',
	h5 = 'h5',
	h6 = 'h6',
	'display-1' = 'h1',
	'display-2' = 'h1',
	'display-3' = 'h1',
	'display-4' = 'h1',
	p = 'p',
	lead = 'p',
	blockquote = 'blockquote',
}

export enum SizeMapTypes {
	xs = 'xs',
	sm = 'sm',
	md = 'md',
	lg = 'lg',
	xl = 'xl',
}

export type UseParamsType = { productId: string | undefined };

export enum FormTargetType {
	update = 'update',
	create = 'create',
	image = 'image',
	password = 'password',
	avatar = 'avatar',
}

export enum ColorsTypes {
	primary = 'primary',
	secondary = 'secondary',
	success = 'success',
	info = 'info',
	warning = 'warning',
	danger = 'danger',
	light = 'light',
	dark = 'dark',
}

export enum StatusTypes {
	open = 'info',
	closed = 'muted',
	pending = 'success',
}

export enum PositionMapTypes {
	topRight = 'top-right',
	topLeft = 'top-left',
	bottomRight = 'bottom-right',
	bottomLeft = 'bottom-left',
}

export enum AuthType {
	STATE_LOGIN = 'STATE_LOGIN',
	STATE_SIGNUP = 'STATE_SIGNUP',
}

export enum OperationType {
	DEC = 'DEC',
	INC = 'INC',
}

export enum OrderType {
	title = 'title',
	price = 'price',
	old_price = 'old_price',
	sold = 'sold',
	model_year = 'model_year',
	created_at = 'created_at',
	updated_at = 'updated_at',
}

export enum ByType {
	ASC = 'ASC',
	DESC = 'DESC',
}

export type NotificationType = {
	id: string | number;
	avatar?: string;
	message: string;
	date: string;
	children?: string;
	type?: TagTypes;
	className?: string;
	tag?: TagTypes;
};

export type AuthStateType = AuthType;
