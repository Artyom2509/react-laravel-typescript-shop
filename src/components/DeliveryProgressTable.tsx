import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType, IDelivery } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import Avatar from './Avatar';
import DeliveryForm from './Form/DeliveryForm';

interface DeliveryProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const DeliveryProgressTable: React.FC<DeliveryProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<IDelivery[]>([]);

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
			const res = await api.fetchAllDelivery();
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error]);

	const removeItem = async (id: number) => {
		try {
			await api.removeDelivery(id, token);
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
					{data.map((delivery, index) => (
						<tr key={delivery.id}>
							<td className="align-middle text-center">{delivery.id}</td>
							<td className="align-middle text-center">
								<Avatar
									size={60}
									circle={false}
									src={delivery.image || process.env.REACT_APP_NO_PRODUCT_IMG}
								/>
							</td>
							<td className="align-middle text-center">{delivery.title}</td>
							<td className="align-middle text-center">
								{delivery.description}
							</td>
							<td className="align-middle text-center">{delivery.price}</td>
							<td className="pt-4 text-center">
								<Button
									onClick={() => modalToggle(FormTargetType.image, delivery.id)}
									color={ColorsTypes.primary}
									size="sm"
									className="mr-1">
									Change image
								</Button>
								<Button
									onClick={() =>
										modalToggle(FormTargetType.update, delivery.id)
									}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(delivery.id)}
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
				<div className="text-center">No deliveries found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Delivery info</ModalHeader>
				<ModalBody>
					<DeliveryForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

DeliveryProgressTable.defaultProps = {
	headers: ['image', 'title', 'description', 'price', 'actions'],
};

export default DeliveryProgressTable;
