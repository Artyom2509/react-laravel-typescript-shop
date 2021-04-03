import { useCallback, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Row, Col, Button, Badge } from 'reactstrap';
import api from '../api';
import AmentsLayout from '../components/Layout/AmentsLayout';
import PromotedProducts from '../components/PromotedProducts';
import { useActions } from '../hooks/useActions';
import { ColorsTypes, IProduct, OperationType, UseParamsType } from '../types';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow, Thumbs } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
	CardActions,
	CardContent,
	IconButton,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import { Rating } from 'primereact/rating';
import { calculateSale } from '../utils/calculateSale';
import { MdFavorite } from 'react-icons/md';
import { GrFavorite } from 'react-icons/gr';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { TabPanel } from '../components/TabPanel';
import { CgClose } from 'react-icons/cg';
import { BsCheck } from 'react-icons/bs';
import ColorItem from '../components/ColorItem';
import ProductReviewForm from '../components/Form/ProductReviewForm';
import NumericInput from 'react-numeric-input';

SwiperCore.use([
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Thumbs,
	EffectCoverflow,
]);

const ProductPage = () => {
	const [loading, setLoading] = useState(false);
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [product, setProduct] = useState<IProduct | null>(null);
	const [tabValue, setTabValue] = useState<number>(0);
	const { productId } = useParams<UseParamsType>();

	const {
		auth: { user },
		cart,
	} = useTypedSelector(({ auth, cart }) => ({ auth, cart }));
	const { wishlistToggle, addToCart, error, productChangeCount } = useActions();

	const wishlistToggleHandler = () => wishlistToggle(product!);

	const isFavorite = useMemo(
		() => user.wishlist?.products.some((prod) => prod.id === +productId!),
		[user, productId]
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

	const loadProduct = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.currentProduct(productId);
			setProduct(res.data);
		} catch ({ message }) {
			error({ message });
		} finally {
			setLoading(false);
		}
	}, [productId, error]);

	useEffect(() => {
		loadProduct();
	}, [loadProduct]);

	return (
		<AmentsLayout>
			<Row>
				<Col md={6}>
					<main>
						<Swiper
							thumbs={{ swiper: thumbsSwiper }}
							pagination={{ clickable: true }}>
							{product?.images.map((image, index) => (
								<SwiperSlide key={image.id} virtualIndex={index}>
									<img
										src={image.url_small}
										style={{ maxWidth: '100%' }}
										alt={product.title}
									/>
								</SwiperSlide>
							))}
						</Swiper>

						<Swiper
							onSwiper={(swiper) => setThumbsSwiper(swiper)}
							watchSlidesVisibility
							slidesPerView={4}
							spaceBetween={20}
							watchSlidesProgress>
							{product?.images.map((image, index) => (
								<SwiperSlide key={image.id} virtualIndex={index}>
									<img
										src={image.url}
										style={{ maxWidth: '100%' }}
										alt={product.title}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</main>
				</Col>
				<Col md={6}>
					{loading || !product ? (
						'Loading...'
					) : (
						<>
							<CardContent>
								<Typography
									gutterBottom
									variant="h3"
									component="h2"
									className="d-flex">
									<span>{product.title}</span>{' '}
									{product.quantity < 1 && (
										<Badge
											size="xs"
											color={ColorsTypes.danger}
											className="mb-1 ml-4">
											Not available
										</Badge>
									)}
								</Typography>
								<div className="d-flex">
									<Rating
										readOnly
										cancel={false}
										className="mr-2 mb-3"
										value={+product.rating || 0}
										stars={5}
									/>{' '}
									{product?.reviews.length && (
										<span>({product?.reviews.length})</span>
									)}
								</div>

								<Typography variant="h5" component="h2">
									<div>
										${product.price}{' '}
										{product!.old_price && (
											<small>
												<del className="text-danger">${product.old_price}</del>
											</small>
										)}
										{product.old_price && (
											<Badge
												size="xs"
												color={ColorsTypes.info}
												className="mb-1 ml-4">
												{calculateSale(product.old_price, product.price) +
													'% Sale'}
											</Badge>
										)}
									</div>
								</Typography>
							</CardContent>
							<CardActions
								className="d-flex justify-content-between"
								style={{ maxWidth: 230 }}>
								{!isInCart ? (
									<Button
										onClick={() => addToCart(product)}
										color="primary"
										disabled={product.quantity < 1}>
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
							<Typography variant="body2" color="textSecondary" component="p">
								<b>Category: </b>
								{product.category.name}
							</Typography>
							{product.sub && (
								<Typography variant="body2" color="textSecondary" component="p">
									<b>Sub category: </b>
									{product.sub.name}
								</Typography>
							)}
						</>
					)}
				</Col>
			</Row>

			<Row>
				<Col md={12}>
					<Tabs
						value={tabValue}
						onChange={(event, value) => setTabValue(value)}
						indicatorColor="primary"
						textColor="primary"
						centered
						aria-label="simple tabs example">
						<Tab label="Description" value={0} />
						<Tab label="Detail" value={1} />
						<Tab
							label={
								<span>
									Reviews{' '}
									{product?.reviews.length && (
										<span>({product?.reviews.length})</span>
									)}
								</span>
							}
							value={2}
						/>
					</Tabs>
					<TabPanel value={tabValue} index={0} centered>
						<div style={{ maxWidth: '700px' }} className="container-fluid">
							{product?.description}
						</div>
					</TabPanel>
					<TabPanel value={tabValue} index={1} centered>
						{product ? (
							<div
								className="text-left container-fluid"
								style={{ maxWidth: '300px' }}>
								<Typography variant="body2" color="textSecondary" component="p">
									<b>Model year: </b>
									{product.model_year}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									<b>Quantity: </b>
									{product.quantity}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									<b>Favorite: </b>
									{product.favorite ? (
										<BsCheck size={20} />
									) : (
										<CgClose size={15} />
									)}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									<b>Hot deal: </b>
									{product.hot_deal ? (
										<BsCheck size={20} />
									) : (
										<CgClose size={15} />
									)}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									<b>New: </b>
									{!product.new ? <BsCheck size={20} /> : <CgClose size={15} />}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									className="d-flex align-items-center">
									<b>Color: </b>
									<ColorItem color={product.color} size={14} />
								</Typography>
							</div>
						) : (
							''
						)}
					</TabPanel>
					<TabPanel value={tabValue} index={2} centered>
						{product && (
							<div>
								<div className="d-flex mb-4 justify-content-center">
									<ProductReviewForm id={product!.id} className="col-md-6" />
								</div>
								<div>
									{product.reviews.map((review) => (
										<div
											key={review.id}
											className="text-left container-fluid mb-3"
											style={{ width: '700px' }}>
											<div>
												Name: <b className="mr-5">{review.name}</b>
												Date: <b>{review.updated_at}</b>
												<Rating
													readOnly
													cancel={false}
													value={+review.rating}
													stars={5}
												/>
											</div>
											<div>{review.text}</div>
										</div>
									))}
								</div>
							</div>
						)}
					</TabPanel>
				</Col>
			</Row>

			<Row>
				<Col md={12}>
					<h6 className="text-center p-3 mt-5 mb-2 jumbotron">
						Favorite products
					</h6>
					<PromotedProducts />
				</Col>
			</Row>
		</AmentsLayout>
	);
};

export default ProductPage;
