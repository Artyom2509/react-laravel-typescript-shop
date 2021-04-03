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

interface BrandFormProps {
	target: FormTargetType;
	id?: number;
}

const BrandForm: React.FC<BrandFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState();

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentBrand(id);
			setName(res.data.name);
			setDescription(res.data.description);
		} catch ({ message }) {
			error({ message });
		}
	}, [id, error]);

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
				formData = { name, description };
				await api.updateBrand(id, formData, token);
			}
			if (target === FormTargetType.create) {
				formData = setFormData({ name, description, image });
				await api.addBrand(formData, token);
			}
			if (target === FormTargetType.image) {
				formData = setFormData({ logo: image });
				await api.addImage(formData, token);
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
							<Label>Name</Label>
							<Input
								value={name}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setName(event.target.value)
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
						Save brand
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(BrandForm);
