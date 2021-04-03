import Page from '../components/Page';
import { IconWidget } from '../components/Widget';
import React, { ChangeEvent, useRef, useState } from 'react';
import { MdRateReview, MdShare, MdThumbUp } from 'react-icons/md';
import { Card, CardGroup, CardHeader, Col, Row, Input } from 'reactstrap';
import ProductsProgressTable from '../components/ProductsProgressTable';

const ProductsPage: React.FC = () => {
	const select = useRef([1, 10, 15, 30, 50]);
	const [count, setCount] = useState(15);

	return (
		<Page
			className="DashboardPage"
			title="Products"
			breadcrumbs={[{ name: 'Products', active: true }]}>
			<CardGroup style={{ marginBottom: '1rem' }}>
				<IconWidget
					bgColor="white"
					inverse={false}
					icon={MdThumbUp}
					title="50+ Likes"
					subtitle="People you like"
				/>
				<IconWidget
					bgColor="white"
					inverse={false}
					icon={MdRateReview}
					title="10+ Reviews"
					subtitle="New Reviews"
				/>
				<IconWidget
					bgColor="white"
					inverse={false}
					icon={MdShare}
					title="30+ Shares"
					subtitle="New Shares"
				/>
			</CardGroup>

			<Row>
				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader className="d-flex justify-content-between  align-items-center">
							<div>Products</div>
							<div className="d-flex align-items-center">
								<span style={{ width: 140 }}>Per page</span>
								<Input
									type="select"
									value={count}
									onChange={(e: ChangeEvent<any>) => setCount(e.target.value)}>
									{select.current.map((el) => (
										<option key={el} value={el}>
											{el}
										</option>
									))}
								</Input>
							</div>
						</CardHeader>

						<ProductsProgressTable count={count} />
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default ProductsPage;
