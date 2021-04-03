import { Row, Col } from 'reactstrap';
import AmentsLayout from '../components/Layout/AmentsLayout';
import PromotedProducts from '../components/PromotedProducts';
import { ByType, OrderType } from '../types';

const HomePage = () => {
	return (
		<AmentsLayout>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">New Arrivals</h4>
					<PromotedProducts newArrival />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">Favorite</h4>
					<PromotedProducts favorite />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">Hot Deal</h4>
					<PromotedProducts hotDeal />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">Top Rated</h4>
					<PromotedProducts rating={4} />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">Top Sales</h4>
					<PromotedProducts order={OrderType.sold} by={ByType.DESC} />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<h4 className="text-center p-3 mt-5 mb-2 jumbotron">Sale</h4>
					<PromotedProducts order={OrderType.old_price} by={ByType.DESC} />
				</Col>
			</Row>
		</AmentsLayout>
	);
};

export default HomePage;
