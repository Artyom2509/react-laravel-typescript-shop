import ProductCard from './Card/ProductCard';
import { Row } from 'reactstrap';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Pane, Spinner } from 'evergreen-ui';
import Pagination from '@material-ui/lab/Pagination';
import { ByType, IProduct, OrderType } from '../types';
import api from '../api';
import { useActions } from '../hooks/useActions';

interface Props {
	order?: OrderType;
	perPage?: number;
	by?: ByType;
	rating?: number;
	newArrival?: boolean;
	favorite?: boolean;
	hotDeal?: boolean;
}

const PromotedProducts: React.FC<Props> = ({
	order,
	by,
	rating,
	newArrival,
	favorite,
	perPage = 4,
	hotDeal,
}) => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [products, setProducts] = useState<IProduct[]>([]);

	const { error } = useActions();

	const loadProducts = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.productsParams({
				page,
				count: perPage,
				order,
				by,
				rating: rating ? rating : null,
				new: newArrival ? 1 : null,
				favorite: favorite ? 1 : null,
				hot_deal: hotDeal ? 1 : null,
			});
			setProducts(res.data.data);
			setPageCount(res.data.meta.last_page);
		} catch ({ message }) {
			error({ message });
		} finally {
			setLoading(false);
		}
	}, [page, error, order, by, rating, newArrival, favorite, hotDeal, perPage]);

	const changePage = (event: ChangeEvent<any>, page: number) => setPage(page);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return (
		<>
			<Row>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Row>

			<div className="d-flex justify-content-center m-3">
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
			</div>
		</>
	);
};

export default PromotedProducts;
