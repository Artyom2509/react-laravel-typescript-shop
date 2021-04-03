import { Badge } from '@material-ui/core';
import { SyntheticEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi';
import { useHistory } from 'react-router';
import { NavLink, Popover, PopoverBody, Button, Table } from 'reactstrap';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { shortText } from '../utils/short-text';
import Avatar from './Avatar';

const MiniCart = () => {
	const [isOpenCartPopover, setIsOpenCartPopover] = useState(false);
	const history = useHistory();

	const cart = useTypedSelector(({ cart }) => cart);
	const { removeFromCart } = useActions();

	const togglePopover = () =>
		cart.products.length > 0 && setIsOpenCartPopover((state) => !state);

	useEffect(() => {
		if (cart.products.length > 0) setIsOpenCartPopover(false);
	}, [cart]);

	return (
		<div>
			<NavLink id="Popover1">
				{cart.products.length ? (
					<Badge
						className="mr-1"
						badgeContent={cart.products.length}
						color="secondary">
						<GiShoppingCart size={30} />
					</Badge>
				) : (
					<GiShoppingCart className="mr-1" size={30} />
				)}
			</NavLink>

			{cart.products.length > 0 && (
				<Popover
					placement="bottom-end"
					isOpen={isOpenCartPopover}
					toggle={togglePopover}
					target="Popover1"
					trigger="legacy"
					className="p-0 border-0 card-popover"
					style={{ minWidth: 740 }}>
					<PopoverBody className="p-2 border-light bd-popover">
						<div>
							<Table responsive hover bordered>
								<thead>
									<tr className="text-capitalize align-middle text-center">
										<th>image</th>
										<th>title</th>
										<th>count</th>
										<th>price</th>
										<th>total price</th>
										<th>action</th>
									</tr>
								</thead>

								<tbody>
									{cart.products.map((product) => (
										<tr
											key={product.id}
											className="c-pointer"
											onClick={() => history.push(`/product/${product.id}`)}>
											<td className="align-middle text-center">
												<Avatar
													size={60}
													circle={false}
													src={
														product.images[0].url_small ||
														process.env.REACT_APP_NO_PRODUCT_IMG
													}
												/>
											</td>
											<td className="align-middle text-center">
												{shortText(product.title, 30)}
											</td>
											<td className="align-middle text-center">
												{product.count}
											</td>
											<td className="align-middle text-center">
												${product.price}
											</td>
											<td className="align-middle text-center">
												${product.sum}
											</td>
											<td className="align-middle text-center">
												<AiOutlineClose
													onClick={(event: SyntheticEvent) => {
														event.stopPropagation();
														removeFromCart(product.id);
													}}
													className="cart-remove"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<div className="d-flex justify-content-between align-items-center pl-5 pr-5">
							<b>Total sum: ${cart.total_sum}</b>
							<b>Total count: {cart.total_count}</b>
							<Button onClick={() => history.push('/cart')}>Go to cart</Button>
						</div>
					</PopoverBody>
				</Popover>
			)}
		</div>
	);
};

export default MiniCart;
