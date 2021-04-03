import { Table, Button } from 'reactstrap';
import { IProduct } from '../types';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Pane, Spinner } from 'evergreen-ui';
import { Rating } from 'primereact/rating';
import { BsCardImage } from 'react-icons/bs';
import Avatar from './Avatar';
import { useTypedSelector } from '../hooks/useTypedSelector';
import api from '../api';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router';

interface WishlistProgressTableProps {
	headers?: Array<string | ReactNode>;
	setTotalSum: (sum: number) => void;
}

const WishlistProgressTable: React.FC<WishlistProgressTableProps> = ({
	headers = [],
	setTotalSum,
	...restProps
}) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IProduct[]>([]);

	const history = useHistory();
	const token = useTypedSelector(({ auth }) => auth.token);
	const { error } = useActions();

	const loadWishlist = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.profileWishlist(token);
			setLoading(false);
			setData(res.data.products);
			setTotalSum(res.data.total_sum);
		} catch ({ message }) {
			setLoading(false);
			error({ message });
		}
	}, [token, error, setTotalSum]);

	useEffect(() => {
		loadWishlist();
	}, [loadWishlist]);

	const deleteProduct = async (id: number) => {
		try {
			await api.toggleWishlist(id, token);
			loadWishlist();
		} catch ({ message }) {
			error({ message });
		}
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
					{data.map(
						(
							{ title, color, rating, images, model_year, price, id },
							index
						) => (
							<tr key={index + 1}>
								<td className="align-middle text-center">{index + 1}</td>
								<td className="align-middle text-center">
									<Avatar
										size={60}
										circle={false}
										src={images[0].url_small || process.env.REACT_APP_NO_AVATAR}
									/>
								</td>
								<td className="align-middle text-center">{title}</td>
								<td className="align-middle text-center">
									<div className="d-flex align-items-center justify-content-center">
										<div
											className="color-badge"
											style={{
												backgroundColor: color.code,
											}}
										/>
										<small>{color.name}</small>
									</div>
								</td>
								<td className="align-middle text-center">
									<Rating readOnly cancel={false} value={+rating} stars={5} />
								</td>
								<td className="align-middle text-center">
									{model_year || 'Not found'}
								</td>
								<td className="align-middle text-center">${price}</td>
								<td className="justify-content-center pt-4 text-center d-flex">
									<Button
										onClick={() => history.push(`/product/${id}`)}
										color="primary"
										size="sm"
										className="mr-1">
										Detail
									</Button>
									<Button onClick={deleteProduct} color="danger" size="sm">
										Delete
									</Button>
								</td>
							</tr>
						)
					)}
				</tbody>
			</Table>
			{!data.length && !loading && (
				<div className="text-center">No product in wishlish.</div>
			)}
			{loading && (
				<Pane>
					<Spinner marginX="auto" marginY={30} />
				</Pane>
			)}
		</>
	);
};

WishlistProgressTable.defaultProps = {
	headers: [
		<BsCardImage size={25} />,
		'title',
		'color',
		'rating',
		'model year',
		'price',
		'actions',
	],
};

export default WishlistProgressTable;
