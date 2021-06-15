import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import api from '../../api';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useForm } from '../../hooks/useForm';

interface BrandFormProps {
	target: FormTargetType;
	id?: number;
}

interface IUseForm {
	name: string;
	description: string;
}

const BrandForm: React.FC<BrandFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm<IUseForm>({
		name: '',
		description: '',
	});
	const [image, setImage] = useState();

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentBrand(id);
			setForm((prev) => ({ ...prev, name: res.data.name }));
			setForm((prev) => ({ ...prev, description: res.data.description }));
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
				await api.updateBrand(id, formData, token);
			}
			if (target === FormTargetType.create) {
				formData = setFormData({ ...form, image });
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
							<Input name="name" onChange={changeHandler} />
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								value="description"
								type="textarea"
								onChange={changeHandler}
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
