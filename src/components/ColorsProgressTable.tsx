import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType, IColor } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import ColorForm from './Form/ColorForm';

interface ColorsProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const ColorsProgressTable: React.FC<ColorsProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<IColor[]>([]);

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
			const res = await api.fetchAllColors();
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error]);

	const removeItem = async (id: number) => {
		try {
			await api.removeBrand(id, token);
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
					{data.map((color, index) => (
						<tr key={color.id}>
							<td className="align-middle text-center">{color.id}</td>
							<td className="align-middle text-center">{color.name}</td>
							<td className="align-middle text-center">{color.code}</td>
							<td className="align-middle text-center">
								<div
									className="color-badge"
									style={{ backgroundColor: color.code }}
								/>
							</td>
							<td className="pt-4 text-center">
								<Button
									onClick={() => modalToggle(FormTargetType.update, color.id)}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(color.id)}
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
				<div className="text-center">No colors found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Color info</ModalHeader>
				<ModalBody>
					<ColorForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

ColorsProgressTable.defaultProps = {
	headers: ['name', 'code', 'color', 'actions'],
};

export default ColorsProgressTable;
