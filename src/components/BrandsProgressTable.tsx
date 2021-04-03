import { Table } from 'reactstrap';
import { ColorsTypes, FormTargetType, Ibrand } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Avatar from './Avatar';
import { Pane, Spinner } from 'evergreen-ui';
import BrandForm from './Form/BrandForm';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';

interface BrandsProgressTableProps {
	headers?: Array<string | ReactNode>;
}

const BrandsProgressTable: React.FC<BrandsProgressTableProps> = ({
	headers = [],
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [current, setCurrent] = useState<number | undefined>();
	const [data, setData] = useState<Ibrand[]>([]);

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
			const brands = await api.fetchAllBrands();
			setData(brands.data);
			setLoading(false);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [error]);

	const removeItem = async (id: number) => {
		try {
			await api.removeBrand(id, token);
		} catch ({ message }) {
			error({ message });
		}
	};

	const modalClose = () => {
		loadItems();
		setModal(false);
	};

	useEffect(() => {
		loadItems();
	}, [loadItems]);

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
					{data.map((brand, index) => (
						<tr key={brand.id}>
							<td className="align-middle text-center">{brand.id}</td>
							<td className="align-middle text-center">
								<Avatar
									size={60}
									circle={false}
									src={brand.logo || process.env.REACT_APP_NO_LOGO}
								/>
							</td>
							<td className="align-middle text-center">{brand.name}</td>
							<td className="align-middle text-center">{brand.description}</td>
							<td className="pt-4 text-center">
								<Button
									onClick={() => modalToggle(FormTargetType.image, brand.id)}
									color={ColorsTypes.primary}
									size="sm"
									className="mr-1">
									Upload logo
								</Button>
								<Button
									onClick={() => modalToggle(FormTargetType.update, brand.id)}
									color={ColorsTypes.warning}
									size="sm"
									className="mr-1">
									Update
								</Button>
								<Button
									onClick={() => removeItem(brand.id)}
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
				<div className="text-center">No brands found.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}

			<Modal isOpen={modal} toggle={modalClose} size="md">
				<ModalHeader toggle={modalClose}>Brand info</ModalHeader>
				<ModalBody>
					<BrandForm target={target} id={current} />
				</ModalBody>
			</Modal>
		</>
	);
};

BrandsProgressTable.defaultProps = {
	headers: ['logo', 'name', 'description', 'actions'],
};

export default BrandsProgressTable;
