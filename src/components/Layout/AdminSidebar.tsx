import logo from '../../assets/img/logo/logo-2.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../SourceLink';
import React from 'react';
import { MdDashboard, MdInsertChart, MdWeb, MdWidgets } from 'react-icons/md';
import { NavLink, Redirect } from 'react-router-dom';
import {
	Nav,
	Navbar,
	NavItem,
	NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const sidebarBackground = {
	backgroundImage: `url("${sidebarBgImage}")`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
};

const adminNavItems = [
	{ to: '/admin/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/profile', name: 'profile', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/wishlist', name: 'wishlist', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/orders', name: 'orders', exact: true, Icon: MdDashboard },
	{ to: '/admin/products', name: 'products', exact: true, Icon: MdDashboard },
	{ to: '/admin/brands', name: 'brands', exact: true, Icon: MdDashboard },
	{ to: '/admin/delivery', name: 'delivery', exact: true, Icon: MdDashboard },
	{ to: '/admin/payments', name: 'payments', exact: true, Icon: MdDashboard },
	{
		to: '/admin/categories',
		name: 'categories',
		exact: true,
		Icon: MdDashboard,
	},
	{ to: '/admin/colors', name: 'colors', exact: true, Icon: MdDashboard },
	{ to: '/admin/coupons', name: 'coupons', exact: true, Icon: MdDashboard },
	{ to: '/admin/reviews', name: 'reviews', exact: true, Icon: MdDashboard },
	{ to: '/admin/status', name: 'status', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/cards', name: 'cards', exact: false, Icon: MdWeb },
	{ to: '/cabinet/charts', name: 'charts', exact: false, Icon: MdInsertChart },
	{ to: '/cabinet/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const userNavItems = [
	{ to: '/cabinet/profile', name: 'profile', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/wishlist', name: 'wishlist', exact: true, Icon: MdDashboard },
	{ to: '/cabinet/orders', name: 'orders', exact: true, Icon: MdDashboard },
];

const getNav = (role: string) => {
	if (role === 'Admin') return adminNavItems;
	if (role === 'Manager') return adminNavItems;
	return userNavItems;
};

const bem = bn.create('sidebar');

const Sidebar: React.FC = () => {
	const auth = useTypedSelector((state) => state.auth);

	if (!auth.token) return <Redirect to="/login" />;

	return (
		<aside className={bem.b()} data-image={sidebarBgImage}>
			<div className={bem.e('background')} style={sidebarBackground} />
			<div className={bem.e('content')}>
				<Navbar>
					<SourceLink className="navbar-brand d-flex">
						<img
							src={logo}
							width="185"
							height="60"
							className="pr-2"
							alt=""
						/>
					</SourceLink>
				</Navbar>
				<Nav vertical>
					{getNav(auth.user.role as string).map(
						({ to, name, exact, Icon }, index) => (
							<NavItem key={index} className={bem.e('nav-item')}>
								<BSNavLink
									id={`navItem-${name}-${index}`}
									className="text-uppercase"
									tag={NavLink}
									to={to}
									activeClassName="active"
									exact={exact}>
									<Icon className={bem.e('nav-item-icon')} />
									<span className="">{name}</span>
								</BSNavLink>
							</NavItem>
						)
					)}
				</Nav>
			</div>
		</aside>
	);
};

export default Sidebar;
