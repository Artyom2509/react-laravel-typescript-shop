import { Table } from 'reactstrap';
import { ColorsTypes, IOrder } from '../types';
import { ReactNode, useState } from 'react';
import { Button, Badge } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Avatar from './Avatar';
import { Rating } from 'primereact/rating';

interface OrdersProgressTableProps {
	headers?: Array<string | ReactNode>;
	loading?: boolean;
	data: IOrder[];
	onToggle: (id: number) => void;
}

const OrdersProgressTable: React.FC<OrdersProgressTableProps> = ({
	loading = false,
	headers = [],
	data = [],
	onToggle,
	...restProps
}) => {
	const [modal, setModal] = useState(false);
	const [idx, setIdx] = useState(0);

	const modalToggle = (index: number = 0) => {
		setModal(true);
		setIdx(index);
	};

	const modalClose = () => {
		setModal(false);
	};

	return (
		<>
			<Table responsive hover {...restProps}>
				<thead>
					<tr className="text-capitalize align-middle text-center">
						<th>#</th>
						{headers.map((item, index) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((order, index) => (
						<tr key={order.id}>
							<td className="align-middle text-center">{index + 1}</td>
							<td className="align-middle text-center">{order.total_count}</td>
							<td className="align-middle text-center">
								{order.payment!.title}
							</td>
							<td className="align-middle text-center">
								{order.coupon ? 'Yes' : 'No'}
							</td>
							<td className="align-middle text-center">
								{order.delivery!.title}
							</td>
							<td className="align-middle text-center">
								${order.delivery!.price}
							</td>
							<td className="align-middle text-center">
								${order.with_delivery}
							</td>
							<td className="align-middle text-center">{order.status!.name}</td>
							<td className="align-middle text-center">
								{order.abort ? (
									<Badge color={ColorsTypes.danger}>Declined</Badge>
								) : (
									<Badge color={ColorsTypes.success}>Accepted</Badge>
								)}
							</td>
							<td className="justify-content-center pt-4 text-center d-flex">
								{order.abort ? (
									<Button
										onClick={() => onToggle(order.id!)}
										color="success"
										size="sm"
										className="mr-1">
										Accept
									</Button>
								) : (
									<Button
										onClick={() => onToggle(order.id!)}
										color="danger"
										size="sm"
										className="mr-1">
										Decline
									</Button>
								)}

								<Button
									onClick={() => modalToggle(index)}
									color="primary"
									size="sm">
									Detail
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!data.length && !loading && (
				<div className="text-center">No orders yet.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}
			<Modal isOpen={modal} toggle={modalClose} size="xl">
				<ModalHeader toggle={modalClose}>
					Order details{' '}
					{data[idx]?.abort ? (
						<Badge color={ColorsTypes.danger}>Declined</Badge>
					) : (
						<Badge color={ColorsTypes.success}>Accepted</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					{data.length && (
						<div>
							<Table>
								<thead>
									<tr className="text-capitalize align-middle text-center">
										<th>id</th>
										<th>Payment</th>
										<th>Coupon</th>
										<th>Delivery price</th>
										<th>Total count</th>
										<th>Total sum</th>
										<th>Total after discout</th>
										<th>With delivery</th>
										<th>Created at</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="align-middle text-center">{data[idx].id}</td>
										<td className="align-middle text-center">
											{data[idx].payment!.title}
										</td>
										<td className="align-middle text-center">
											{!!data[idx].coupon ? 'Yes' : 'No'}
										</td>
										<td className="align-middle text-center">
											${data[idx].delivery!.price}
										</td>
										<td className="align-middle text-center">
											{data[idx].total_count}
										</td>
										<td className="align-middle text-center">
											${data[idx].total_sum}
										</td>
										<td className="align-middle text-center">
											${data[idx].total_after_discount}
										</td>
										<td className="align-middle text-center">
											${data[idx].with_delivery}
										</td>
										<td className="align-middle text-center">
											{data[idx].created_at}
										</td>
									</tr>
								</tbody>
							</Table>
							<h5 className="mt-5">Products in order</h5>
							<Table>
								<thead>
									<tr className="text-capitalize align-middle text-center">
										<th>Image</th>
										<th>Title</th>
										<th>Color</th>
										<th>Rating</th>
										<th>Category</th>
										<th>Sub</th>
										<th>Price</th>
										<th>Count</th>
										<th>Sum</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{data[idx].products.map((product) => (
										<tr key={product.id}>
											<td className="align-middle text-center">
												<Avatar
													size={60}
													circle={false}
													src={
														product.product_info?.images[0]?.url_small ||
														process.env.REACT_APP_NO_PRODUCT_IMG
													}
												/>
											</td>
											<td className="align-middle text-center">
												{product.product_info?.title}
											</td>
											<td className="align-middle text-center">
												<div className="d-flex align-items-center justify-content-center">
													<div
														className="color-badge"
														style={{
															backgroundColor: product.product_info?.color.code,
														}}
													/>
													<small>{product.product_info?.color.name}</small>
												</div>
											</td>
											<td className="align-middle text-center">
												<Rating
													readOnly
													cancel={false}
													value={+product.product_info?.rating!}
													stars={5}
												/>
											</td>
											<td className="align-middle text-center">
												{product.product_info?.category.name}
											</td>
											<td className="align-middle text-center">
												{product.product_info?.sub?.name || 'Not found'}
											</td>
											<td className="align-middle text-center">
												${product.product_info?.price}
											</td>
											<td className="align-middle text-center">
												{product.count}
											</td>
											<td className="align-middle text-center">
												${product.sum}
											</td>
											<td className="align-middle text-center">
												<Button>Detail</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					)}
				</ModalBody>
			</Modal>
		</>
	);
};

OrdersProgressTable.defaultProps = {
	headers: [
		'products count',
		'payment',
		'coupon',
		'delivery title',
		'delivery price',
		'with delivery',
		'status',
		'accepted',
		'action',
	],
};

export default OrdersProgressTable;
