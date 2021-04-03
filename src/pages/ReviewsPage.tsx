import Page from '../components/Page';
import { IconWidget } from '../components/Widget';
import React, { useEffect } from 'react';
import { MdRateReview, MdShare, MdThumbUp } from 'react-icons/md';
import { Card, CardBody, CardGroup, CardHeader, Col, Row } from 'reactstrap';
import ReviewsProgressTable from '../components/ReviewsProgressTable';

const ReviewsPage: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Page
			className="DashboardPage"
			title="Reviews"
			breadcrumbs={[{ name: 'Reviews', active: true }]}>
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
						<CardHeader>Reviews</CardHeader>
						<CardBody>
							<ReviewsProgressTable />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default ReviewsPage;