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
import api from '../../api';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { Rating } from 'primereact/rating';
import { useForm } from '../../hooks/useForm';

interface ReviewFormProps {
	target: FormTargetType;
	id?: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({
		rating: 0,
		product_id: 0,
		name: '',
		text: '',
		email: '',
		status: false,
	});

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentReview(id, token);
			const { product_id, name, email, text, rating, status } = res.data;
			setForm({ product_id, name, email, text, rating, status });
		} catch ({ message }) {
			error({ message });
		}
	}, [id, error, token, setForm]);

	const initState = useCallback(async () => {
		if (target === FormTargetType.update) {
			loadInfo();
		}
	}, [loadInfo, target]);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				await api.updateReview(
					id,
					{ ...form, status: form.status ? 1 : 0 },
					token
				);
			}
			if (target === FormTargetType.create) {
				await api.addReview({ ...form, status: form.status ? 1 : 0 }, token);
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
			{!loading && (
				<>
					{
						<FormGroup>
							<Label>Product id</Label>
							<Input
								value={form.product_id}
								name="product_id"
								type="number"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setForm((prev) => ({ ...prev, product_id: +e.target.value }))
								}
							/>
						</FormGroup>
					}
					<FormGroup>
						<Label>Name</Label>
						<Input value={form.name} name="name" onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input value={form.email} name="email" onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label>Text</Label>
						<Input
							value={form.text}
							name="text"
							type="textarea"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Rating</Label>
						<Rating
							cancel={false}
							value={+form.rating}
							stars={5}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, rating: +e.target.value }))
							}
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="checkbox"
								checked={form.status}
								onChange={() =>
									setForm((prev) => ({ ...prev, status: !prev.status }))
								}
							/>{' '}
							Accept
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
						disabled={form.product_id <= 0}
						onClick={handleSubmit}>
						Save review
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ReviewForm);
