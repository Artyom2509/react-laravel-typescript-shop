import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles/reduction.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import GAListener from './components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import React, { useEffect } from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthType } from './types';
import NotificationSystem from 'react-notification-system-redux';
import { NOTIFICATION_SYSTEM_STYLE } from './utils/constants';
import { useTypedSelector } from './hooks/useTypedSelector';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import { useActions } from './hooks/useActions';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const AlertPage = React.lazy(() => import('./pages/AlertPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const OrdersPage = React.lazy(() => import('./pages/OrdersPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const BrandsPage = React.lazy(() => import('./pages/BrandsPage'));
const CouponsPage = React.lazy(() => import('./pages/CouponsPage'));
const DeliveryPage = React.lazy(() => import('./pages/DeliveryPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const StatusPage = React.lazy(() => import('./pages/StatusPage'));
const ColorsPage = React.lazy(() => import('./pages/ColorsPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const AdminProductsPage = React.lazy(() => import('./pages/AdminProductsPage'));
const WishlistPage = React.lazy(() => import('./pages/WishlistPage'));
const AuthModalPage = React.lazy(() => import('./pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('./pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('./pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('./pages/ButtonPage'));
const CardPage = React.lazy(() => import('./pages/CardPage'));
const ChartPage = React.lazy(() => import('./pages/ChartPage'));
const DropdownPage = React.lazy(() => import('./pages/DropdownPage'));
const FormPage = React.lazy(() => import('./pages/FormPage'));
const InputGroupPage = React.lazy(() => import('./pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('./pages/ModalPage'));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage'));
const TablePage = React.lazy(() => import('./pages/TablePage'));
const TypographyPage = React.lazy(() => import('./pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('./pages/WidgetPage'));

interface AppProps {
	breakpoint?: string;
}

const getBasename = () => {
	return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const App: React.FC<AppProps> = ({ breakpoint }) => {
	const notifications = useTypedSelector(({ notifications }) => notifications);

	const { authenticate } = useActions();

	useEffect(() => {
		authenticate();
	}, [authenticate]);

	return (
		<BrowserRouter basename={getBasename()}>
			<GAListener>
				<Switch>
					{/* Auth */}
					<LayoutRoute
						exact
						path="/login"
						layout={EmptyLayout}
						component={(props: any) => (
							<AuthPage {...props} authState={AuthType.STATE_LOGIN} />
						)}
					/>
					<LayoutRoute
						exact
						path="/signup"
						layout={EmptyLayout}
						component={(props: any) => (
							<AuthPage {...props} authState={AuthType.STATE_SIGNUP} />
						)}
					/>

					{/* Shop */}
					<Route exact path="/" component={HomePage} />
					<Route exact path="/product/:productId" component={ProductPage} />
					<Route exact path="/cart" component={CartPage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />

					{/* Cabinet */}
					<MainLayout breakpoint={breakpoint!}>
						<React.Suspense fallback={<PageSpinner />}>
							<Route exact path="/admin/dashboard" component={DashboardPage} />
							<Route exact path="/cabinet/" component={DashboardPage} />
							<Route
								exact
								path="/cabinet/login-modal"
								component={AuthModalPage}
							/>
							<Route exact path="/cabinet/buttons" component={ButtonPage} />
							<Route exact path="/cabinet/profile" component={ProfilePage} />
							<Route exact path="/cabinet/wishlist" component={WishlistPage} />
							<Route exact path="/admin/delivery" component={DeliveryPage} />
							<Route exact path="/admin/payments" component={PaymentPage} />
							<Route exact path="/admin/coupons" component={CouponsPage} />
							<Route exact path="/admin/reviews" component={ReviewsPage} />
							<Route exact path="/admin/brands" component={BrandsPage} />
							<Route
								exact
								path="/admin/categories"
								component={CategoriesPage}
							/>
							<Route exact path="/admin/colors" component={ColorsPage} />
							<Route exact path="/admin/status" component={StatusPage} />
							<Route exact path="/cabinet/orders" component={OrdersPage} />
							<Route
								exact
								path="/admin/products"
								component={AdminProductsPage}
							/>
							<Route exact path="/cabinet/cards" component={CardPage} />
							<Route exact path="/cabinet/widgets" component={WidgetPage} />
							<Route
								exact
								path="/cabinet/typography"
								component={TypographyPage}
							/>
							<Route exact path="/cabinet/alerts" component={AlertPage} />
							<Route exact path="/cabinet/tables" component={TablePage} />
							<Route exact path="/cabinet/badges" component={BadgePage} />
							<Route
								exact
								path="/cabinet/button-groups"
								component={ButtonGroupPage}
							/>
							<Route exact path="/cabinet/dropdowns" component={DropdownPage} />
							<Route exact path="/cabinet/progress" component={ProgressPage} />
							<Route exact path="/cabinet/modals" component={ModalPage} />
							<Route exact path="/cabinet/forms" component={FormPage} />
							<Route
								exact
								path="/cabinet/input-groups"
								component={InputGroupPage}
							/>
							<Route exact path="/cabinet/charts" component={ChartPage} />
						</React.Suspense>
					</MainLayout>

					<Redirect to="/" />
				</Switch>

				<NotificationSystem
					notifications={notifications}
					style={NOTIFICATION_SYSTEM_STYLE}
				/>
			</GAListener>
		</BrowserRouter>
	);
};

const query = ({ width }: { width: number }) => {
	if (width < 575) {
		return { breakpoint: 'xs' };
	}

	if (576 < width && width < 767) {
		return { breakpoint: 'sm' };
	}

	if (768 < width && width < 991) {
		return { breakpoint: 'md' };
	}

	if (992 < width && width < 1199) {
		return { breakpoint: 'lg' };
	}

	if (width > 1200) {
		return { breakpoint: 'xl' };
	}

	return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
