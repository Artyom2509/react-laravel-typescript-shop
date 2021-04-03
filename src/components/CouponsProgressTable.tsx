import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType, ICoupon } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, Badge } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import CouponForm from './Form/CouponForm';

interface CouponProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const CouponProgressTable: React.FC<CouponProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<ICoupon[]>([]);

	const token = useTypedSelector(({ auth }) => auth.token);
	const { error } = useActions();

	const modalToggle = (target: FormTargetType, id?: number) => {
		setModal(true);
		setTarget(target);
		if (id) setCurrent(id);
	};

	const loadItems = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.fetchAllCoupons(token);
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error, token]);

	const removeItem = async (id: number) => {
		try {
			await api.removeCoupon(id, token);
			loadItems();
		} catch ({ message }) {
			error({ message });
		}
	};

	const toggleActive = async (id: number) => {
		try {
			await api.toggleCouponActive(id, token);
			loadItems();
		} catch ({ message }) {
			error({ message });
		}
	};

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	const modalClose = () => {
		loadItems();
		setModal(false);
	};

	return (
		<>
			<div className="mb-2 text-center">
				<Button onClick={() => modalToggle(FormTargetType.create)}>
					Add New
				</Button>
			</div>

			<Table responsive hover {...restProps}>
				<thead>
					<tr className="text-capitalize align-middle text-center">
						<th>id</th>
						{headers.map((item, index) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((coupon, index) => (
						<tr key={coupon.id}>
							<td className="align-middle text-center">{coupon.id}</td>
							<td className="align-middle text-center">
								({coupon.value}){' '}
								<Badge color="success">
									Sale {Math.abs(coupon.value * 100 - 100)}%
								</Badge>
							</td>
							<td className="align-middle text-center">{coupon.code}</td>
							<td className="align-middle text-center">
								{coupon.is_enabled ? 'Yes' : 'No'}
							</td>
							<td className="pt-4 text-center">
								{!coupon.is_enabled ? (
									<Button
										onClick={() => toggleActive(coupon.id)}
										color="success"
										size="sm"
										className="mr-1">
										Enable
									</Button>
								) : (
									<Button
										onClick={() => toggleActive(coupon.id)}
										color="danger"
										size="sm"
										className="mr-1">
										Disable
									</Button>
								)}
								<Button
									onClick={() => modalToggle(FormTargetType.update, coupon.id)}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(coupon.id)}
									color={ColorsTypes.danger}
									size="sm"
									className="mr-1">
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!data.length && !loading && (
				<div className="text-center">No coupons found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Coupon info</ModalHeader>
				<ModalBody>
					<CouponForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

CouponProgressTable.defaultProps = {
	headers: ['value', 'code', 'enabled', 'actions'],
};

export default CouponProgressTable;
