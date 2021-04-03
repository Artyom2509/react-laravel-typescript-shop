import AmentsLayout from '../components/Layout/AmentsLayout';
import {
	Row,
	Col,
	CardBody,
	Card,
	CardHeader,
	CardFooter,
	Button,
	Label,
	Input,
	FormGroup,
} from 'reactstrap';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@material-ui/core';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useActions } from '../hooks/useActions';
import api from '../api';
import { AuthUser, IDelivery, IOrder, IPayment, ProductInCart } from '../types';
import AuthModal from './AuthModal';
import Avatar from '../components/Avatar';
import { useHistory } from 'react-router';

const CheckoutPage = () => {
	const { cart, auth, order } = useTypedSelector((state) => state);
	const history = useHistory();
	const {
		error,
		orderAddUser,
		orderAddProducts,
		orderAddPayment,
		orderAdd,
		orderClear,
		cartClear,
		orderAddDelivery,
	} = useActions();

	const deliveries = useRef<IDelivery[]>([]);
	const payments = useRef<IPayment[]>([]);

	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirm, setPassword_confirm] = useState('');
	const [phone, setPhone] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [delivery_id, setDelivery_id] = useState(0);
	const [payment_id, setPayment_id] = useState(0);
	const [coupon, setCoupon] = useState('');

	const [activeStep, setActiveStep] = useState(0);
	const steps = useRef(['Contacts', 'Payment', 'Delivery']);

	useEffect(() => {
		if (auth.token) {
			setPhone(auth.user.contacts?.phone || '');
			setCity(auth.user.contacts?.city || '');
			setAddress(auth.user.contacts?.address || '');
		}
	}, [auth]);

	const initSettings = useCallback(async () => {
		try {
			const delivery = await api.fetchAllDelivery();
			deliveries.current = delivery.data;
			const payment = await api.fetchAllPayments();
			payments.current = payment.data;
		} catch ({ message }) {
			error({ message });
		}
	}, [error]);

	useEffect(() => {
		initSettings();
		orderAddProducts(cart.products);
	}, [initSettings, orderAddProducts, cart]);

	const applyCoupon = () => {};

	const clearOrderHanlder = () => {
		orderClear();
		history.push('/');
	};

	const handleNext = async () => {
		try {
			switch (activeStep) {
				case 0:
					if (auth.token) {
						orderAddUser(transformUser(auth.user));
					} else {
						const userRes = await api.addOrderUser({
							first_name,
							last_name,
							email,
							password,
							phone,
							city,
							address,
						});
						orderAddUser(transformUser(userRes.data));
					}

					break;

				case 1:
					if (!payment_id) return error({ message: 'Please select payment' });
					const payment = payments.current.find((p) => p.id === payment_id);
					if (payment) orderAddPayment(payment);
					else throw Error('Payment not found');
					break;

				case 2:
					if (!delivery_id) return error({ message: 'Please select delivery' });
					const delivery = deliveries.current.find((d) => d.id === delivery_id);
					if (delivery) orderAddDelivery(delivery);
					else throw Error('Delivery not found');
					break;

				default:
					break;
			}

			if (activeStep === steps.current.length - 1) {
				const orderRes = await api.addOrder({
					products: transformProducts(order.products),
					user_id: order.user!.id,
					payment_id: order.payment!.id,
					delivery_id,
				});
				orderAdd(transformOrder(orderRes.data));
				cartClear();
			}

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		} catch ({ message }) {
			return error({ message });
		}
	};

	const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<>
						<div>
							{auth.token ? (
								<p className="h4">
									Hello {auth.user.full_name}. Fill your contacts.
								</p>
							) : (
								<div className="d-flex">
									<p className="h4 mr-4 mt-1">
										Please login if you are have account.{' '}
									</p>
									<AuthModal />
								</div>
							)}
						</div>
						{!auth.token && (
							<>
								<FormGroup>
									<Label>First name</Label>
									<Input
										value={first_name}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setFirst_name(event.target.value)
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Last name</Label>
									<Input
										value={last_name}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setLast_name(event.target.value)
										}
									/>
								</FormGroup>

								<FormGroup>
									<Label>Email</Label>
									<Input
										value={email}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setEmail(event.target.value)
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Password</Label>
									<Input
										value={password}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setPassword(event.target.value)
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Confirm password</Label>
									<Input
										value={password_confirm}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setPassword_confirm(event.target.value)
										}
									/>
								</FormGroup>
							</>
						)}
						<FormGroup>
							<Label>Phone</Label>
							<Input
								value={phone}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setPhone(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>City</Label>
							<Input
								value={city}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCity(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Address</Label>
							<Input
								value={address}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setAddress(event.target.value)
								}
							/>
						</FormGroup>
					</>
				);

			case 1:
				return (
					<div className="m-3">
						<p className="h4">Select Payment.</p>
						<RadioGroup
							name="payment"
							value={payment_id}
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								setPayment_id(+event.target.value);
							}}>
							{payments.current.map((payment) => (
								<FormControlLabel
									key={payment.id}
									value={payment.id}
									label={payment.title}
									control={<Radio />}
								/>
							))}
						</RadioGroup>
					</div>
				);

			case 2:
				return (
					<div className="m-3">
						<p className="h4">Select Delivery.</p>
						<RadioGroup
							name="delivery"
							value={delivery_id}
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								setDelivery_id(+event.target.value);
							}}>
							{deliveries.current.map((delivery) => (
								<FormControlLabel
									key={delivery.id}
									checked={delivery.id === delivery_id}
									value={delivery.id}
									label={
										<span>
											<b>${delivery.price}</b> {delivery.title}
										</span>
									}
									control={<Radio />}
								/>
							))}
						</RadioGroup>
					</div>
				);

			default:
				return 'Not found';
		}
	};

	return (
		<AmentsLayout>
			<Row>
				<Col md={8}>
					<main>
						<CardBody>
							<h2>Create order</h2>
							<Stepper activeStep={activeStep} orientation="vertical">
								{steps.current.map((label, index) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
										<StepContent>
											<div>{getStepContent(index)}</div>
											<div>
												<div>
													<Button
														disabled={activeStep === 0}
														onClick={handleBack}
														className="mr-2">
														Back
													</Button>
													<Button
														variant="contained"
														color="primary"
														disabled={!order.products.length}
														onClick={handleNext}>
														{activeStep === steps.current.length - 1
															? 'Finish'
															: 'Next'}
													</Button>
												</div>
											</div>
										</StepContent>
									</Step>
								))}
							</Stepper>
							{activeStep === steps.current.length && (
								<Paper className="m-3" square elevation={0}>
									<Typography className="mb-3">
										All steps completed - you&apos;re finished creating order.
										{auth.token
											? ' Check your user dashboard'
											: ' Login and check your user dashboard'}
										.
									</Typography>
									<Typography className="mb-3">
										<Button onClick={clearOrderHanlder}>Apply</Button>
									</Typography>
								</Paper>
							)}
						</CardBody>
					</main>
				</Col>

				<Col md={4}>
					<CardBody>
						<Card>
							<CardHeader>
								<b>Order Summary</b>
							</CardHeader>
							{order.user.contacts.phone ? (
								<CardFooter>
									<p className="h5">User contacts.</p>
									Phone: <b>{order.user.contacts.phone}</b> <br />
									City: <b>{order.user.contacts.city}</b> <br />
									Address: <b>{order.user.contacts.address}</b> <br />
								</CardFooter>
							) : (
								<CardFooter>
									<p className="h6">Order details...</p>
									Total count:{' '}
									<b>
										{order.products.length === 0
											? 'No products in order'
											: order.products.length}
									</b>
									<br />
								</CardFooter>
							)}
							{order.payment?.id && (
								<CardFooter>
									<p className="h5">Payment info.</p>
									{order.payment.image && (
										<div className="mb-2">
											<Avatar circle={false} src={order.payment.image} />
										</div>
									)}
									Title: <b>{order.payment.title}</b> <br />
									Description: <b>{order.payment.description || 'None'}</b>{' '}
									<br />
								</CardFooter>
							)}
							{order.delivery?.id && (
								<CardFooter>
									<p className="h5">Delivery info.</p>
									{order.delivery.image && (
										<div className="mb-2">
											<Avatar circle={false} src={order.delivery.image} />
										</div>
									)}
									Title: <b>{order.delivery.title}</b> <br />
									Description: <b>
										{order.delivery.description || 'None'}
									</b>{' '}
									<br />
									Price: <b>${order.delivery.price}</b> <br />
								</CardFooter>
							)}
							{order.id && (
								<CardFooter>
									<p className="h5">Order details.</p>
									Total products count: <b>{order.total_count}</b> <br />
									Total sum: <b>${order.total_sum}</b> <br />
									Total after discount: <b>
										${order.total_after_discount}
									</b>{' '}
									<br />
									With delivery: <b>${order.with_delivery}</b> <br />
								</CardFooter>
							)}
							{order.id && (
								<CardFooter>
									<div className="d-flex align-items-center">
										<FormGroup>
											<p className="h5">Enter coupon code.</p>
											<Input
												value={coupon}
												onChange={(event: ChangeEvent<HTMLInputElement>) =>
													setCoupon(event.target.value)
												}
											/>
										</FormGroup>
										<Button onClick={applyCoupon} className="ml-2 mt-3">
											Apply
										</Button>
									</div>
								</CardFooter>
							)}
						</Card>
					</CardBody>
				</Col>
			</Row>
		</AmentsLayout>
	);
};

const transformUser = (user: AuthUser) => {
	return {
		id: user.id,
		first_name: user.first_name,
		last_name: user.last_name,
		full_name: user.full_name,
		email: user.email,
		contacts: user.contacts!,
	};
};

const transformOrder = (order: IOrder) => {
	return {
		id: order.id,
		total_sum: order.total_sum,
		total_count: order.total_count,
		total_after_discount: order.total_after_discount,
		with_delivery: order.with_delivery,
	};
};

const transformProducts = (products: ProductInCart[]) => {
	return products.map(({ id, count }) => ({ product_id: id, count }));
};

export default CheckoutPage;
