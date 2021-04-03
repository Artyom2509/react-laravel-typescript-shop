import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType } from '../types';
import {
	Children,
	cloneElement,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

interface SingleProgressTableProps {
	headers?: Array<string | ReactNode>;
	name: string;
	fetchAll: () => Promise<any>;
	removeItem: (id: number, token: string) => void;
	children?: any;
}

const SingleProgressTable: React.FC<SingleProgressTableProps> = ({
	headers = [],
	fetchAll,
	name,
	removeItem,
	children,
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<any>([]);

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
			const res = await fetchAll();
			setData(res.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error, fetchAll]);

	const remove = async (id: number) => {
		try {
			await removeItem(id, token!);
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
					{data.map((item: any, index: number) => (
						<tr key={item.id}>
							<td className="align-middle text-center">{index + 1}</td>
							<td className="align-middle text-center">{item.name}</td>
							<td className="pt-4 text-center">
								<Button
									onClick={() => modalToggle(FormTargetType.update, item.id)}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => remove(item.id)}
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
				<div className="text-center">No {name} found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>{name} info</ModalHeader>
				<ModalBody>
					{children &&
						Children.map(children, (child) => {
							return cloneElement(child, { target, current });
						})}
				</ModalBody>
			</Modal>
		</>
	);
};

SingleProgressTable.defaultProps = {
	headers: ['name', 'actions'],
};

export default SingleProgressTable;
