import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Pane, Spinner } from 'evergreen-ui';
import api from '../../api';
import { useActions } from '../../hooks/useActions';
import { Rating } from 'primereact/rating';
import { useForm } from '../../hooks/useForm';

interface Props {
	id: number;
	className?: string;
}

const ProductReviewForm: React.FC<Props> = ({ id, className }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({
		rating: 0,
		name: '',
		text: '',
		email: '',
	});
	const [rating, setRating] = useState(0);
	const [name, setName] = useState('');
	const [text, setText] = useState('');
	const [email, setEmail] = useState('');

	const { error, success } = useActions();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		setLoading(true);
		try {
			const { data } = await api.addProductReview({
				text,
				product_id: id,
				rating,
				name,
				email,
			});
			setLoading(false);
			success({ message: data.message });

			setRating(0);
			setName('');
			setText('');
			setEmail('');
		} catch ({ message }) {
			error({ message });
			setLoading(false);
		}
	};

	return (
		<Form
			onSubmit={handleSubmit}
			encType="multipart/form-data"
			className={className || ''}>
			<div className="d-flex justify-content-between">
				<FormGroup>
					<Label>Name</Label>
					<Input value={form.name} name="name" onChange={changeHandler} />
				</FormGroup>
				<FormGroup>
					<Label>Email</Label>
					<Input value={form.email} name="email" onChange={changeHandler} />
				</FormGroup>
			</div>

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
						disabled={!id || id <= 0}
						onClick={handleSubmit}>
						Add review
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ProductReviewForm);
