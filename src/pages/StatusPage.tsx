import Page from '../components/Page';
import { IconWidget } from '../components/Widget';
import React, { useEffect } from 'react';
import { MdRateReview, MdShare, MdThumbUp } from 'react-icons/md';
import { Card, CardBody, CardGroup, CardHeader, Col, Row } from 'reactstrap';
import SingleProgressTable from '../components/SingleProgressTable';
import api from '../api';
import SingleForm from '../components/Form/SingleForm';

const StatusPage: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Page
			className="DashboardPage"
			title="Product options"
			breadcrumbs={[{ name: 'Product options', active: true }]}>
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
						<CardHeader>Status</CardHeader>
						<CardBody>
							<SingleProgressTable
								name="Status"
								fetchAll={api.fetchAllStatus}
								removeItem={api.removeStatus}>
								<SingleForm
									formName="Status"
									findOne={api.currentStatus}
									update={api.updateStatus}
									add={api.addStatus}
								/>
							</SingleProgressTable>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default StatusPage;
