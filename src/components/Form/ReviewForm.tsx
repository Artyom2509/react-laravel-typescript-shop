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

interface ReviewFormProps {
	target: FormTargetType;
	id?: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [rating, setRating] = useState(0);
	const [product_id, setProduct_id] = useState(0);
	const [name, setName] = useState('');
	const [text, setText] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState(false);

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentReview(id, token);
			setProduct_id(res.data.product_id);
			setName(res.data.name);
			setEmail(res.data.email);
			setText(res.data.text);
			setRating(res.data.rating);
			setStatus(res.data.status);
		} catch ({ message }) {
			error({ message });
		}
	}, [id, error, token]);

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
					{ text, product_id, rating, name, email, status: status ? 1 : 0 },
					token
				);
			}
			if (target === FormTargetType.create) {
				await api.addReview(
					{ text, product_id, rating, name, email, status: status ? 1 : 0 },
					token
				);
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
								value={product_id}
								type="number"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setProduct_id(+event.target.value)
								}
							/>
						</FormGroup>
					}
					<FormGroup>
						<Label>Name</Label>
						<Input
							value={name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							value={email}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Text</Label>
						<Input
							value={text}
							type="textarea"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setText(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Rating</Label>
						<Rating
							cancel={false}
							value={+rating}
							stars={5}
							onChange={(e) => setRating(+e.target.value)}
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="checkbox"
								checked={status}
								onChange={() => setStatus((prev) => !prev)}
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
						disabled={product_id <= 0}
						onClick={handleSubmit}>
						Save review
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ReviewForm);
