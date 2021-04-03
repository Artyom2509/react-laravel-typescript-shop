import { Table, CardBody } from 'reactstrap';
import { OperationType, ProductInCart } from '../types';
import { ReactNode } from 'react';
import Avatar from './Avatar';
import { useActions } from '../hooks/useActions';
import ColorItem from './ColorItem';
import { shortText } from '../utils/short-text';
import { AiOutlineClose } from 'react-icons/ai';
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom';

interface CartProductsProgressProps {
	headers?: Array<string | ReactNode>;
	products: ProductInCart[];
}

const CartProductsProgress: React.FC<CartProductsProgressProps> = ({
	headers = [],
	products,
}) => {
	const { removeFromCart, productChangeCount } = useActions();

	const changeCountHandler = (
		count: number,
		value: number,
		productId: number
	) => {
		if (count < value) productChangeCount(productId, OperationType.INC);
		if (count > value) productChangeCount(productId, OperationType.DEC);
	};

	return (
		<CardBody>
			<Table responsive hover bordered>
				<thead>
					<tr className="text-capitalize align-middle text-center">
						{headers.map((item, index) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
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
								{shortText(product.title, 20)}
							</td>
							<td className="align-middle text-center">
								<ColorItem
									className="d-flex align-items-center justify-content-center"
									color={product.color}
								/>
							</td>
							<td className="align-middle text-center">${product.price}</td>
							<td className="align-middle text-center">${product.sum}</td>
							<td className="align-middle text-center">
								<NumericInput
									className="form-control"
									value={product.count}
									min={0}
									max={product.quantity}
									size={1}
									onChange={(value) =>
										changeCountHandler(product.count, value!, product.id)
									}
									mobile
								/>
							</td>
							<td className="pt-4 text-center">
								<AiOutlineClose
									onClick={() => removeFromCart(product.id)}
									className="cart-remove"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!products.length && (
				<div className="text-center">
					Cart is empty. <Link to="/shop">Back to shop</Link>
				</div>
			)}
		</CardBody>
	);
};

CartProductsProgress.defaultProps = {
	headers: ['image', 'title', 'color', 'price', 'sum', 'count', 'actions'],
};

export default CartProductsProgress;
