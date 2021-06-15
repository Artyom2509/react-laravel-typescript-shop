import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import api from '../../api';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useForm } from '../../hooks/useForm';

interface ColorFormProps {
	target: FormTargetType;
	id?: number;
}

const ColorForm: React.FC<ColorFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({ name: '', code: '#000000' });

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentColor(id);
			setForm((prev) => ({ ...prev, name: res.data.name }));
			setForm((prev) => ({ ...prev, code: res.data.code }));
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

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				await api.updateColor(id, form, token);
			}
			if (target === FormTargetType.create) {
				await api.addColor(form, token);
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
					<FormGroup>
						<Label>Name</Label>
						<Input name="name" value={form.name} onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label>Code</Label>
						<Input
							name="code"
							value={form.code}
							type="color"
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
						Save color
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ColorForm);
