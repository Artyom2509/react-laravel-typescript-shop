import {
	Table,
	CardBody,
	Modal,
	ModalBody,
	ModalHeader,
	Button,
	Badge,
} from 'reactstrap';
import { ColorsTypes, FormTargetType, IProduct } from '../types';
import {
	ChangeEvent,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';
import Avatar from './Avatar';
import { Rating } from 'primereact/rating';
import ProductForm from './Form/ProductForm';
import api from '../api';
import { useActions } from '../hooks/useActions';
import { Pane, Spinner } from 'evergreen-ui';
import Pagination from '@material-ui/lab/Pagination';
import ColorItem from './ColorItem';
import { shortText } from '../utils/short-text';

interface ProductsProgressTableProps {
	headers?: Array<string | ReactNode>;
	count?: number;
}

const ProductsProgressTable: React.FC<ProductsProgressTableProps> = ({
	headers = [],
	count,
	...restProps
}) => {
	const [data, setData] = useState<IProduct[]>([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [productId, setProductId] = useState(1);
	const [loading, setLoading] = useState(false);
	const [target, setTarget] = useState(FormTargetType.update);
	const [modal, setModal] = useState(false);

	const changePage = (event: ChangeEvent<unknown>, value: number) =>
		setPage(value);

	const { error } = useActions();

	const loadProducts = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.productsPaginate(page, count);
			setLoading(false);
			setData(res.data.data);
			setPageCount(res.data.meta.last_page);
		} catch (err) {
			setLoading(false);
			error({ message: err.message });
		}
	}, [error, page, count]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	const modalToggle = (target: FormTargetType, id?: number) => {
		setModal(true);
		setTarget(target);
		if (id) setProductId(id);
	};

	const modalClose = () => {
		setModal(false);
		loadProducts();
	};

	return (
		<>
			<CardBody>
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
						{data.map((product, index) => (
							<tr key={product.id}>
								<td className="align-middle text-center">{product.id}</td>
								<td className="align-middle text-center">
									<Avatar
										size={60}
										circle={false}
										src={
											product.images[0]?.url_small ||
											process.env.REACT_APP_NO_PRODUCT_IMG
										}
									/>
								</td>
								<td className="align-middle text-center">
									{shortText(product.title, 30)}
								</td>
								<td className="align-middle text-center">
									<ColorItem
										className="d-flex align-items-center justify-content-center"
										color={product.color}
									/>
								</td>
								<td className="align-middle text-center">${product.price}</td>
								<td className="align-middle text-center">
									<del>${product.old_price}</del>
								</td>
								<td className="align-middle text-center">
									<Rating
										readOnly
										cancel={false}
										value={+product.rating}
										stars={5}
									/>
								</td>
								<td className="align-middle text-center">
									{product.new && (
										<div>
											<Badge color={ColorsTypes.success} className="mb-1">
												New
											</Badge>
										</div>
									)}
									{product.favorite && (
										<div>
											<Badge color={ColorsTypes.primary} className="mb-1">
												Favorite
											</Badge>
										</div>
									)}
									{product.hot_deal && (
										<div>
											<Badge color={ColorsTypes.warning} className="mb-1">
												Hot deal
											</Badge>
										</div>
									)}
								</td>
								<td className="pt-4 text-center">
									<Button
										onClick={() =>
											modalToggle(FormTargetType.image, product.id)
										}
										color={ColorsTypes.primary}
										size="sm"
										className="mr-1">
										Upload image
									</Button>
									<Button
										onClick={() =>
											modalToggle(FormTargetType.update, product.id)
										}
										color={ColorsTypes.warning}
										size="sm"
										className="mr-1">
										Edit
									</Button>
									<Button
										onClick={() => {}}
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
				{!loading && !data.length && (
					<div className="text-center">No products found.</div>
				)}
			</CardBody>

			<CardBody className="mx-auto text-center">
				{loading ? (
					<Pane>
						<Spinner marginX="auto" marginY={10} />
					</Pane>
				) : (
					<Pagination
						count={pageCount}
						variant="outlined"
						color="secondary"
						page={page}
						onChange={changePage}
					/>
				)}

				<Modal isOpen={modal} toggle={modalClose} size="md">
					<ModalHeader toggle={modalClose}>Product info</ModalHeader>
					<ModalBody>
						<ProductForm target={target} productId={productId} />
					</ModalBody>
				</Modal>
			</CardBody>
		</>
	);
};

ProductsProgressTable.defaultProps = {
	headers: [
		'image',
		'title',
		'color',
		'price',
		'old price',
		'rating',
		'options',
		'actions',
	],
};

export default ProductsProgressTable;
