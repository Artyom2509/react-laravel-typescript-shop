import AmentsLayout from '../components/Layout/AmentsLayout';
import {
	Row,
	Col,
	CustomInput,
	Input,
	CardHeader,
	FormGroup,
	Label,
} from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from '../components/Card/ProductCard';
import api from '../api';
import { useActions } from '../hooks/useActions';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
	IProduct,
	ByType,
	OrderType,
	ICategory,
	ISub,
	IColor,
	Ibrand,
} from '../types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Slider,
	Typography,
	Button,
} from '@material-ui/core';
import { Rating } from 'primereact/rating';
import ColorItem from '../components/ColorItem';
import { useTypedSelector } from '../hooks/useTypedSelector';

const ShopPage = () => {
	const [allCategory, setAllCategory] = useState<ICategory[]>([]);
	const [allSubs, setAllSubs] = useState<ISub[]>([]);
	const [allColors, setAllColors] = useState<IColor[]>([]);
	const [allBrands, setAllBrands] = useState<Ibrand[]>([]);
	const [category, setCategory] = useState(0);
	const [sub, setSub] = useState(0);
	const [color, setColor] = useState(0);
	const [brand, setBrand] = useState(0);
	const select = useRef([1, 9, 15, 30, 60]);
	const [count, setCount] = useState(15);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [by, setBy] = useState(ByType.ASC);
	const [order, setOrder] = useState(OrderType.title);
	const [sliderValue, setSliderValue] = useState<Array<number>>([0, 10000]);
	const [favorite, setFavorite] = useState(false);
	const [newArrival, setNewArrival] = useState(false);
	const [hot_deal, setHot_deal] = useState(false);
	const [rating, setRating] = useState(0);

	const { error, searchProduct } = useActions();
	const search = useTypedSelector(({ search }) => search.text);

	const loadOptions = useCallback(async () => {
		setLoading(true);
		try {
			const categoryRes = await api.fetchAllCategory();
			setAllCategory(categoryRes.data);
			const subRes = await api.fetchAllSubs();
			setAllSubs(subRes.data);
			const colorsRes = await api.fetchAllColors();
			setAllColors(colorsRes.data);
			const brandsRes = await api.fetchAllBrands();
			setAllBrands(brandsRes.data);
			setLoading(false);
		} catch (error) {
			console.log('loadOptions -> error', error);
			setLoading(false);
		}
	}, []);

	const loadProducts = useCallback(async () => {
		setLoading(true);
		try {
			const [price_from, price_to] = sliderValue;
			const res = await api.productsParams({
				count,
				page,
				by,
				order,
				price_from,
				price_to,
				rating,
				new: newArrival ? 1 : null,
				favorite: favorite ? 1 : null,
				hot_deal: hot_deal ? 1 : null,
				category: category ? category : null,
				sub: sub ? sub : null,
				color: color ? color : null,
				brand: brand ? brand : null,
				search: search ? search : null,
			});
			setProducts(res.data.data);
			setPageCount(res.data.meta.last_page);
		} catch ({ message }) {
			error({ message });
		} finally {
			setLoading(false);
		}
	}, [
		page,
		error,
		count,
		by,
		order,
		sliderValue,
		newArrival,
		favorite,
		rating,
		hot_deal,
		category,
		sub,
		color,
		search,
		brand,
	]);

	const changePage = (event: ChangeEvent<any>, page: number) => setPage(page);

	const filterClearHandler = () => {
		setSub(0);
		searchProduct('');
		setBrand(0);
		setCategory(0);
		setColor(0);
		setRating(0);
		setFavorite(false);
		setNewArrival(false);
		setHot_deal(false);
		setSliderValue([0, 10000]);
	};

	const handleSliderChange = (event: any, newValue: number | number[]) => {
		setSliderValue(newValue as number[]);
	};

	useEffect(() => {
		loadOptions();
	}, [loadOptions]);

	useEffect(() => {
		const timeout = setTimeout(() => loadProducts(), 700);
		return () => clearTimeout(timeout);
	}, [loadProducts]);

	return (
		<AmentsLayout>
			<Row>
				<Col md={3}>
					<div className="d-flex justify-content-between align-items-center mt-3 mb-2">
						<h5 className="">Filters</h5>
						<div>
							<Button
								variant="outlined"
								color="primary"
								size="small"
								onClick={filterClearHandler}>
								Clear
							</Button>
						</div>
					</div>

					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Price</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Slider
								value={sliderValue}
								onChange={handleSliderChange}
								valueLabelDisplay="on"
								className="mt-3"
								max={7000}
								aria-labelledby="range-slider"
								getAriaValueText={(value: number) => `$${value}`}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Options</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											checked={favorite}
											onChange={() => setFavorite((prev) => !prev)}
										/>{' '}
										Favorite
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											checked={newArrival}
											onChange={() => setNewArrival((prev) => !prev)}
										/>{' '}
										New
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											checked={hot_deal}
											onChange={() => setHot_deal((prev) => !prev)}
										/>{' '}
										Hot deal
									</Label>
								</FormGroup>
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Rating</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
								{[5, 4, 3, 2, 1].map((val) => (
									<Rating
										key={val}
										cancel={false}
										onChange={(e) => setRating(val)}
										value={val}
										stars={val}
									/>
								))}
								<Rating
									cancel={false}
									onChange={(e) => setRating(e.value)}
									value={0}
									stars={1}
								/>
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Category</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
							<CustomInput
									type="radio"
									id={`catRadio${0}`}
									name="category"
									checked={0 === category}
									onChange={() => setCategory(0)}
									label={'None'}
								/>
								{allCategory.map((item) => (
									<CustomInput
										key={item.id}
										type="radio"
										id={`catRadio${item.id}`}
										name="category"
										checked={item.id === category}
										onChange={() => setCategory(item.id)}
										label={item.name}
									/>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Sub category</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
								<CustomInput
									type="radio"
									id={`subRadio${0}`}
									name="sub"
									checked={0 === sub}
									onChange={() => setSub(0)}
									label={'None'}
								/>
								{allSubs.map((item) => (
									<CustomInput
										key={item.id}
										type="radio"
										id={`subRadio${item.id}`}
										name="sub"
										checked={item.id === sub}
										onChange={() => setSub(item.id)}
										label={item.name}
									/>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Brand</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
								{allBrands.map((item) => (
									<CustomInput
										key={item.id}
										type="radio"
										id={`brandRadio${item.id}`}
										name="brand"
										checked={item.id === brand}
										onChange={() => setBrand(item.id)}
										label={item.name}
									/>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content">
							<Typography>Colors</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div>
								{allColors.map((item) => (
									<CustomInput
										key={item.id}
										type="radio"
										id={`colorRadio${item.id}`}
										name="color"
										checked={item.id === color}
										onChange={() => setColor(item.id)}
										label={<ColorItem color={item} size={14} />}
									/>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
				</Col>

				<Col md={9}>
					<main>
						<CardHeader className="d-flex justify-content-between  align-items-center mb-3">
							<div className="d-flex justify-content-between  align-items-center">
								<div className="d-flex align-items-center mr-4">
									<span style={{ width: 90 }}>Order</span>
									<Input
										type="select"
										value={order}
										onChange={(e: ChangeEvent<any>) =>
											setOrder(e.target.value)
										}>
										<option value={OrderType.title}>Title</option>
										<option value={OrderType.price}>Price</option>
										<option value={OrderType.sold}>Best sellers</option>
										<option value={OrderType.model_year}>Model year</option>
										<option value={OrderType.updated_at}>Created date</option>
									</Input>
								</div>
								<div className="d-flex align-items-center">
									<span style={{ width: 35 }}>By</span>
									<Input
										type="select"
										value={by}
										onChange={(e: ChangeEvent<any>) => setBy(e.target.value)}>
										<option value={ByType.ASC}>Ascending</option>
										<option value={ByType.DESC}>Descending</option>
									</Input>
								</div>
							</div>

							<div className="d-flex align-items-center">
								<span style={{ width: 140 }}>Per page</span>
								<Input
									type="select"
									value={count}
									onChange={(e: ChangeEvent<any>) => setCount(e.target.value)}>
									{select.current.map((el) => (
										<option key={el} value={el}>
											{el}
										</option>
									))}
								</Input>
							</div>
						</CardHeader>

						<Row>
							{products.map((product) => (
								<ProductCard key={product.id} size={4} product={product} />
							))}
						</Row>

						<div className="d-flex justify-content-center m-3">
							{loading ? (
								<Pane>
									<Spinner marginX="auto" marginY={0} />
								</Pane>
							) : (
								<>
									{products.length > 0 ? (
										<Pagination
											count={pageCount}
											variant="outlined"
											color="secondary"
											page={page}
											onChange={changePage}
										/>
									) : (
										<div className="text-center">
											<h6>Products not found</h6>
										</div>
									)}
								</>
							)}
						</div>
					</main>
				</Col>
			</Row>
		</AmentsLayout>
	);
};

export default ShopPage;
