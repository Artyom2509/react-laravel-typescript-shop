import React, {
	ChangeEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Button, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import api from '../../api';
import {
	ColorsTypes,
	FormTargetType,
	IBrand,
	ICategory,
	IColor,
	IPicture,
	ISub,
} from '../../types';
import Avatar from '../Avatar';

interface ProductFormProps {
	target: FormTargetType;
	productId?: number;
}

const ProductForm: React.FC<ProductFormProps> = ({ target, productId }) => {
	const [loading, setLoading] = useState(false);
	const [allCategory, setAllCategory] = useState<ICategory[]>([]);
	const [allSubs, setAllSubs] = useState<ISub[]>([]);
	const [allColors, setAllColors] = useState<IColor[]>([]);
	const [allBrands, setAllBrands] = useState<IBrand[]>([]);
	const [allImages, setAllImages] = useState<IPicture[]>([]);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [old_price, setOld_price] = useState<number | null>(null);
	const [quantity, setQuantity] = useState(0);
	const [model_year, setModel_year] = useState<string | null>('');
	const [category_id, setCategory_id] = useState(0);
	const [sub_id, setSub_id] = useState(0);
	const [color_id, setColor_id] = useState(1);
	const [brand_id, setBrand_id] = useState(1);
	const [image, setImage] = useState();
	const [favorite, setFavorite] = useState(false);
	const [newArrival, setNewArrival] = useState(false);
	const [hot_deal, setHot_deal] = useState(false);

	const { token } = useTypedSelector(({ auth }) => auth);

	const loadProduct = useCallback(async () => {
		try {
			const res = await api.currentProduct(productId);
			setTitle(res.data.title);
			setDescription(res.data.description);
			setPrice(res.data.price);
			setOld_price(res.data.old_price);
			setQuantity(res.data.quantity);
			setModel_year(res.data.model_year);
			setCategory_id(res.data.category.id);
			setSub_id(res.data.sub_id);
			setColor_id(res.data.color.id);
			setBrand_id(res.data.brand.id);
			setFavorite(res.data.favorite);
			setHot_deal(res.data.hot_deal);
			setNewArrival(res.data.new);
		} catch (error) {
			console.log('error', error);
		}
	}, [productId]);

	const loadSubs = useCallback(() => {
		if (category_id === 0) return;
		const subs = allCategory.find((cat) => cat.id === category_id)?.subs || [];
		setAllSubs(subs);
		setSub_id(subs[0]?.id || 0)
	}, [category_id, allCategory]);

	const loadOptions = useCallback(async () => {
		setLoading(true);
		try {
			const categoryRes = await api.fetchAllCategory();
			setAllCategory(categoryRes.data);
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

	const loadProductImages = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.fetchProductImages(productId);
			setAllImages(res.data);
			setLoading(false);
		} catch (error) {
			console.log('loadProductImages -> error', error);
			setLoading(false);
		}
	}, [productId]);

	const initState = useCallback(async () => {
		if (target === FormTargetType.update) {
			loadProduct();
			loadOptions();
		}
		if (target === FormTargetType.create) {
			loadOptions();
		}
		if (target === FormTargetType.image) {
			loadProductImages();
		}
	}, [loadOptions, loadProduct, target, loadProductImages]);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				await api.productUpdate(
					productId,
					{
						title,
						description,
						price,
						old_price,
						quantity,
						model_year,
						category_id,
						sub_id,
						color_id,
						brand_id,
						favorite,
						hot_deal,
						new: newArrival,
					},
					token
				);
			}
			if (target === FormTargetType.create) {
				await api.productCreate(
					{
						title,
						description,
						price,
						old_price,
						quantity,
						model_year,
						category_id,
						sub_id,
						color_id,
						brand_id,
						favorite,
						hot_deal,
						new: newArrival,
					},
					token
				);
			}
			if (target === FormTargetType.image) {
				const formData = setFormData({ image, product_id: productId });
				await api.addImage(formData, token);
				loadProductImages();
			}
			setLoading(false);
		} catch (err) {
			console.log('handleSubmit -> err', err);
			setLoading(false);
		}
	};

	useEffect(() => {
		initState();
	}, [initState]);

	useEffect(() => {
		loadSubs();
	}, [loadSubs]);

	const deleteImage = async (id: number) => {
		try {
			const res = await api.removeImage(id, token);
			console.log('deleteImage -> res', res);
			loadProductImages();
		} catch (error) {
			console.log('deleteImage -> error', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit} encType="multipart/form-data">
			{!loading && target === FormTargetType.image && (
				<>
					<Table>
						<thead>
							<tr className="text-capitalize align-middle text-center">
								<th>Image</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{allImages.map((image) => (
								<tr key={image.id}>
									<td className="align-middle text-center">
										<Avatar size={60} circle={false} src={image.url} />
									</td>
									<td className="align-middle text-center">
										<Button className="mr-1" color={ColorsTypes.primary}>
											Update
										</Button>
										<Button onClick={() => deleteImage(image.id)}>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className="mt-5">
						<h5>Image upload</h5>
					</div>
					<FormGroup>
						<div></div>
						<input
							type="file"
							onChange={(event: any) => setImage(event.target.files[0])}
						/>
					</FormGroup>
				</>
			)}
			{!loading &&
				(target === FormTargetType.update ||
					target === FormTargetType.create) && (
					<>
						<FormGroup>
							<Label>Title</Label>
							<Input
								value={title}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setTitle(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								value={description}
								type="textarea"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setDescription(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Price</Label>
							<Input
								value={price}
								type="number"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setPrice(+event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Old price</Label>
							<Input
								value={old_price}
								type="number"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setOld_price(+event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Quantity</Label>
							<Input
								value={quantity}
								type="number"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setQuantity(+event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Model year</Label>
							<Input
								value={model_year}
								type="date"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setModel_year(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Category</Label>
							<Input
								value={category_id}
								type="select"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCategory_id(+event.target.value)
								}>
								<option value={0} disabled>
									Select category
								</option>
								{allCategory.map(({ id, name }) => (
									<option key={id} value={id}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label>Sub category</Label>
							<Input
								value={sub_id}
								disabled={category_id === 0 || sub_id === 0}
								type="select"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setSub_id(+event.target.value)
								}>
								{allSubs.map(({ id, name }) => (
									<option key={id} value={id}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label>Color</Label>
							<Input
								value={color_id}
								type="select"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setColor_id(+event.target.value)
								}>
								{allColors.map(({ id, name, code }) => (
									<option key={id} value={id} style={{ backgroundColor: code }}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label>Brand</Label>
							<Input
								value={brand_id}
								type="select"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setBrand_id(+event.target.value)
								}>
								{allBrands.map(({ id, name }) => (
									<option key={id} value={id}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>
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
					</>
				)}

			<hr />

			<div className="text-center pt-1">
				{loading ? (
					<Pane>
						<Spinner marginX="auto" marginY={60} />
					</Pane>
				) : (
					<Button
						size="lg"
						className="bg-gradient-theme-left border-0"
						block
						disabled={target !== FormTargetType.image && category_id === 0}
						onClick={handleSubmit}>
						Update product
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ProductForm);
