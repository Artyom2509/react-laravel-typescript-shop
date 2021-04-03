import Page from '../components/Page';
import { IconWidget } from '../components/Widget';
import React, { useEffect } from 'react';
import { MdRateReview, MdShare, MdThumbUp } from 'react-icons/md';
import { Card, CardBody, CardGroup, CardHeader, Col, Row } from 'reactstrap';
import SingleProgressTable from '../components/SingleProgressTable';
import api from '../api';
import SingleForm from '../components/Form/SingleForm';
import SubsForm from '../components/Form/SubsForm';

const CategoryPage: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Page
			className="DashboardPage"
			title="Categories"
			breadcrumbs={[{ name: 'Categories', active: true }]}>
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
				<Col md="6" sm="12" xs="12">
					<Card>
						<CardHeader>Category</CardHeader>
						<CardBody>
							<SingleProgressTable
								name="Category"
								fetchAll={api.fetchAllCategory}
								removeItem={api.removeCategory}>
								<SingleForm
									formName="Category"
									findOne={api.currentCategory}
									update={api.updateCategory}
									add={api.addCategory}
								/>
							</SingleProgressTable>
						</CardBody>
					</Card>
				</Col>
				<Col md="6" sm="12" xs="12">
					<Card>
						<CardHeader>Sub categories</CardHeader>
						<CardBody>
							<SingleProgressTable
								name="Sub categories"
								fetchAll={api.fetchAllSubs}
								removeItem={api.removeSub}>
								<SubsForm />
							</SingleProgressTable>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default CategoryPage;
