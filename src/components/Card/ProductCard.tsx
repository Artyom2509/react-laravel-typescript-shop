import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { useMemo } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import { Button, Badge, Col } from 'reactstrap';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ColorsTypes, IProduct, OperationType } from '../../types';
import { calculateSale } from '../../utils/calculateSale';
import { shortText } from '../../utils/short-text';
import NumericInput from 'react-numeric-input';

interface ProductCardProps {
	product: IProduct;
	size?: number;
}

const ProductCard = ({ product, size = 3 }: ProductCardProps) => {
	const {
		auth: { user },
		cart,
	} = useTypedSelector(({ auth, cart }) => ({ auth, cart }));
	const { wishlistToggle, addToCart, productChangeCount } = useActions();
	const history = useHistory();

	const wishlistToggleHandler = () => wishlistToggle(product);

	const isFavorite = useMemo(
		() => user.wishlist?.products.some((prod) => prod.id === product.id),
		[user, product.id]
	);

	const isInCart = useMemo(
		() => cart.products.some((prod) => prod.id === product?.id),
		[cart, product]
	);

	const productInCart = useMemo(
		() => cart.products.find((prod) => prod.id === product?.id),
		[cart, product]
	);

	const changeCountHandler = (value: number, productId: number) => {
		if (productInCart!.count < value)
			productChangeCount(productId, OperationType.INC);
		if (productInCart!.count > value)
			productChangeCount(productId, OperationType.DEC);
	};

	return (
		<Col md={size}>
			<div className="card-overlay">
				<div className="card-overlay-head d-flex justify-content-between">
					<div>
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
					</div>
					<div>
						{product.old_price && (
							<div>
								<Badge size="xs" color={ColorsTypes.info} className="mb-1">
									{calculateSale(product.old_price, product.price) + '% Sale'}
								</Badge>
							</div>
						)}
					</div>
				</div>
				<Card>
					<CardActionArea
						onClick={() => history.push(`/product/${product.id}`)}>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="180"
							image={
								product.images[0].url_small ||
								process.env.REACT_APP_NO_PRODUCT_IMG
							}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<div className="d-flex justify-content-between">
								<Rating
									readOnly
									cancel={false}
									value={+product.rating}
									stars={5}
								/>
								{product.quantity < 1 && (
									<Badge
										size="md"
										color={ColorsTypes.danger}
										className="mb-1 ml-4">
										Not available
									</Badge>
								)}
							</div>
							<Typography
								gutterBottom
								variant="h6"
								component="h3"
								className="d-flex justify-content-between">
								<span>{shortText(product.title, 20)}</span>
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{shortText(product.description, 35)}
							</Typography>
							<Typography variant="h5" component="h2">
								<div>
									${product.price}{' '}
									{product.old_price && (
										<small>
											<del className="text-danger">${product.old_price}</del>
										</small>
									)}
								</div>
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions className="d-flex justify-content-between">
						{!isInCart ? (
							<Button
								disabled={product.quantity < 1}
								onClick={() => addToCart(product)}
								color="primary">
								Add to cart
							</Button>
						) : (
							<NumericInput
								className="form-control"
								value={productInCart?.count}
								min={0}
								max={productInCart?.quantity}
								size={2}
								onChange={(value) => changeCountHandler(value!, product.id)}
								mobile
							/>
						)}
						<div className="m-3">
							<IconButton color="secondary" onClick={wishlistToggleHandler}>
								{isFavorite ? <MdFavorite /> : <GrFavorite />}
							</IconButton>
						</div>
					</CardActions>
				</Card>
			</div>
		</Col>
	);
};

export default ProductCard;
