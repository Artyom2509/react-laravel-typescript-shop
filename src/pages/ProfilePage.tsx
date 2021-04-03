import bg1Image from '../assets/img/bg/background_640-1.jpg';
import bg3Image from '../assets/img/bg/background_640-3.jpg';
import { AnnouncementCard } from '../components/Card';
import Page from '../components/Page';
import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Row,
	Modal,
	ModalBody,
	CardHeader,
	ModalHeader,
} from 'reactstrap';
import { ChartData } from 'chart.js';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IconWidget } from '../components/Widget';
import { MdInsertChart, RiMoneyDollarCircleLine } from 'react-icons/all';
import ProfileUserForm from '../components/Form/ProfileUserForm';
import { ColorsTypes, FormTargetType } from '../types';
import { getColor } from '../utils/colors';
import { randomNum } from '../utils/demos';
import { getStackLineChart, stackLineChartOptions } from '../demos/chartjs';

const genPieData = () => {
	return {
		datasets: [
			{
				data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
				backgroundColor: [
					getColor('primary'),
					getColor('secondary'),
					getColor('success'),
					getColor('info'),
					getColor('danger'),
				],
				label: 'Dataset 1',
			},
		],
		labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
	};
};

const CardPage: React.FC = () => {
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);

	const { user } = useTypedSelector(({ auth }) => auth);

	const modalToggle = (target: FormTargetType) => {
		setTarget(target);
		setModal(true);
	};

	const closeModal = () => setModal(false);

	return (
		<Page title="Profile" breadcrumbs={[{ name: 'profile', active: true }]}>
			<Row>
				<Col lg={4} md={6} sm={6} xs={12} className="mb-3">
					<IconWidget
						bgColor={'primary'}
						icon={RiMoneyDollarCircleLine}
						title={'title'}
						subtitle={'subtitle'}
					/>
				</Col>
				<Col lg={4} md={6} sm={6} xs={12} className="mb-3">
					<IconWidget
						bgColor={ColorsTypes.info}
						icon={RiMoneyDollarCircleLine}
						title={'title'}
						subtitle={'subtitle'}
					/>
				</Col>
				<Col lg={4} md={6} sm={6} xs={12} className="mb-3">
					<IconWidget
						bgColor={ColorsTypes.success}
						icon={RiMoneyDollarCircleLine}
						title={'title'}
						subtitle={'subtitle'}
					/>
				</Col>
			</Row>

			<Row>
				<Col lg={4} md={4} sm={12} xs={12}>
					<Card>
						<Line
							data={
								getStackLineChart({
									labels: [
										'January',
										'February',
										'March',
										'April',
										'May',
										'June',
										'July',
									],
									data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
								}) as ChartData
							}
							options={stackLineChartOptions}
						/>
						<CardBody className="text-primary" style={{ position: 'absolute' }}>
							<CardTitle>
								<MdInsertChart /> Sales
							</CardTitle>
						</CardBody>
					</Card>
				</Col>

				<Col lg={4} md={4} sm={12} xs={12}>
					<Card>
						<Line
							data={
								getStackLineChart({
									labels: [
										'January',
										'February',
										'March',
										'April',
										'May',
										'June',
										'July',
									],
									data: [10000, 15000, 5000, 10000, 5000, 10000, 10000],
								}) as ChartData
							}
							options={stackLineChartOptions}
						/>
						<CardBody className="text-primary" style={{ position: 'absolute' }}>
							<CardTitle>
								<MdInsertChart /> Revenue
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
				<Col lg={4} md={4} sm={12} xs={12}>
					<Card>
						<Line
							data={
								getStackLineChart({
									labels: [
										'January',
										'February',
										'March',
										'April',
										'May',
										'June',
										'July',
									],
									data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
								}) as ChartData
							}
							options={stackLineChartOptions}
						/>
						<CardBody
							className="text-primary"
							style={{ position: 'absolute', right: 0 }}>
							<CardTitle>
								<MdInsertChart /> Profit
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col md={6} xl={6} lg={12}>
					<AnnouncementCard
						color="gradient-secondary"
						header="User Info"
						avatar={user.avatar!}
						avatarSize={140}
						name={user.full_name!}
						date={user.role!}
						text={user.email!}
						buttonProps={{
							children: 'Update',
							onClick: () => modalToggle(FormTargetType.update),
						}}
						button2Props={{
							children: 'Change Avatar',
							onClick: () => modalToggle(FormTargetType.avatar),
						}}
						button3Props={{
							children: 'Change Password',
							onClick: () => modalToggle(FormTargetType.password),
						}}
						style={{ height: 385 }}
					/>
					<Modal isOpen={modal} toggle={closeModal}>
						<ModalHeader toggle={closeModal}>Change User Info</ModalHeader>
						<ModalBody>
							<ProfileUserForm target={target} />
						</ModalBody>
					</Modal>
				</Col>

				<Col md={6} xl={6} lg={12}>
					<Card>
						<CardHeader>Pie</CardHeader>
						<CardBody>
							<Pie data={genPieData() as ChartData} />
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col md={6} sm={6} xs={12} className="mb-3">
					<Card className="flex-row">
						<CardImg
							className="card-img-left"
							src={bg1Image}
							style={{ width: 'auto', height: 150 }}
						/>
						<CardBody>
							<CardTitle>Horizontal Image Card(Left)</CardTitle>
							<CardText>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</CardText>
						</CardBody>
					</Card>
				</Col>

				<Col md={6} sm={6} xs={12} className="mb-3">
					<Card className="flex-row">
						<CardBody>
							<CardTitle>Horizontal Image Card(Right)</CardTitle>
							<CardText>Some quick example card</CardText>
						</CardBody>
						<CardImg
							className="card-img-right"
							src={bg3Image}
							style={{ width: 'auto', height: 150 }}
						/>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default CardPage;
