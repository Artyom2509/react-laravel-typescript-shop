import AmentsLayout from '../components/Layout/AmentsLayout';
import {
	Row,
	Col,
	CardBody,
	Card,
	CardHeader,
	CardFooter,
	Button,
} from 'reactstrap';
import CartProductsProgress from '../components/CartProductsProgressTable';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useHistory } from 'react-router';

const CartPage = () => {
	const cart = useTypedSelector(({ cart }) => cart);
	const history = useHistory();

	return (
		<AmentsLayout>
			<Row>
				<Col md={8}>
					<main>
						<CartProductsProgress products={cart.products} />
					</main>
				</Col>

				<Col md={4}>
					<CardBody>
						<Card>
							<CardHeader>
								<b>Cart Totals</b>
							</CardHeader>
							<CardBody>
								Total count: <b>{cart.total_count}</b> <br />
								Total sum: <b>${cart.total_sum}</b> <br />
							</CardBody>
							<CardFooter>
								<Button onClick={() => history.push('/checkout')} disabled={!cart.total_count}>
									Proceed to checkout
								</Button>
							</CardFooter>
						</Card>
					</CardBody>
				</Col>
			</Row>
		</AmentsLayout>
	);
};

export default CartPage;
