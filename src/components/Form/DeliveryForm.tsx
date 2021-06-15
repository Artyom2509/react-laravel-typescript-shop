import React, {
	ChangeEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import api from '../../api';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useForm } from '../../hooks/useForm';

interface DeliveryFormProps {
	target: FormTargetType;
	id?: number;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({
		title: '',
		description: '',
		price: 0,
	});
	const [image, setImage] = useState();

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentDelivery(id);
			setForm((prev) => ({ ...prev, title: res.data.title as string }));
			setForm((prev) => ({
				...prev,
				description: res.data.description as string,
			}));
			setForm((prev) => ({ ...prev, price: res.data.price as number }));
		} catch ({ message }) {
			error({ message });
		}
	}, [id, error, setForm]);

	const initState = useCallback(async () => {
		if (target === FormTargetType.update) {
			loadInfo();
		}
	}, [loadInfo, target]);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		let formData;

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				formData = form;
				await api.updateDelivery(id, formData, token);
			}
			if (target === FormTargetType.create) {
				formData = setFormData({ ...form, image });
				await api.addDelivery(formData, token);
			}
			if (target === FormTargetType.image) {
				formData = setFormData({ image });
				await api.updateDeliveryImage(id, formData, token);
			}
			setLoading(false);
		} catch ({ message }) {
			error({ message });
			setLoading(false);
		}
	};

	useEffect(() => {
		initState();
	}, [initState]);

	return (
		<Form onSubmit={handleSubmit} encType="multipart/form-data">
			{!loading && target === FormTargetType.image && (
				<>
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
							<div></div>
							<input
								type="file"
								onChange={(event: any) => setImage(event.target.files[0])}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Title</Label>
							<Input value={form.title} name="title" onChange={changeHandler} />
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								value={form.description}
								name="description"
								type="textarea"
								onChange={changeHandler}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Price</Label>
							<Input
								value={form.price}
								name="price"
								type="number"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setForm((prev) => ({ ...prev, price: +e.target.value }))
								}
							/>
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
						onClick={handleSubmit}>
						Save delivery
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(DeliveryForm);
