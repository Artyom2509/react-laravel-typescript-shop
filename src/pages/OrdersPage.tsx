import Page from '../components/Page';
import { IconWidget } from '../components/Widget';
import React, { useCallback, useEffect, useState } from 'react';
import { MdInsertChart } from 'react-icons/md';
import { ChartData } from 'chart.js';
import { Card, Row, CardBody, CardTitle, Col, CardHeader } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { getStackLineChart, stackLineChartOptions } from '../demos/chartjs';
import { ColorsTypes, IOrder } from '../types';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import OrdersProgressTable from '../components/OrdersProgressTable';
import { useActions } from '../hooks/useActions';

const DashboardPage: React.FC = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = useTypedSelector(({ auth }) => auth.token);

	const toggleOrderHandle = async (id: number) => {
		const res = await api.orderToggle(id, token);
		info({ message: res.data.message });
		loadOrders();
	};

	const { error, info } = useActions();

	const loadOrders = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.profileOrders(token);
			setLoading(false);
			setOrders(res.data);
		} catch (err) {
			setLoading(false);
			error({ message: err.message });
		}
	}, [token, error]);

	const setOrdersSum = (orders: IOrder[]) => {
		if (!orders.length) return 0;
		return orders.reduce((acc, o) => acc + o.with_delivery, 0);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		loadOrders();
	}, [loadOrders]);

	return (
		<Page
			className="DashboardPage"
			title="Orders"
			breadcrumbs={[{ name: 'Orders', active: true }]}>
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
				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader>Orders Total Sum: ${setOrdersSum(orders)}</CardHeader>
						<CardBody>
							<OrdersProgressTable
								data={orders}
								loading={loading}
								onToggle={toggleOrderHandle}
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default DashboardPage;
