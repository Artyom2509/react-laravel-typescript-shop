import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType, IPayment } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import Avatar from './Avatar';
import PaymentForm from './Form/PaymentForm';

interface PaymentProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const PaymentProgressTable: React.FC<PaymentProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<IPayment[]>([]);

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
			const res = await api.fetchAllPayments();
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error]);

	const removeItem = async (id: number) => {
		try {
			await api.removePayment(id, token);
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
					{data.map((payment, index) => (
						<tr key={payment.id}>
							<td className="align-middle text-center">{payment.id}</td>
							<td className="align-middle text-center">
								<Avatar
									size={60}
									circle={false}
									src={payment.image || process.env.REACT_APP_NO_PRODUCT_IMG}
								/>
							</td>
							<td className="align-middle text-center">{payment.title}</td>
							<td className="align-middle text-center">
								{payment.description}
							</td>
							<td className="align-middle text-center">{payment.value}</td>
							<td className="pt-4 text-center">
								<Button
									onClick={() => modalToggle(FormTargetType.image, payment.id)}
									color={ColorsTypes.primary}
									size="sm"
									className="mr-1">
									Change image
								</Button>
								<Button
									onClick={() =>
										modalToggle(FormTargetType.update, payment.id)
									}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(payment.id)}
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
				<div className="text-center">No payments found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Payment info</ModalHeader>
				<ModalBody>
					<PaymentForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

PaymentProgressTable.defaultProps = {
	headers: ['image', 'title', 'description', 'value', 'actions'],
};

export default PaymentProgressTable;
