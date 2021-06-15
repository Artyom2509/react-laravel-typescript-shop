import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useForm } from '../../hooks/useForm';

interface SingleFormProps {
	target?: FormTargetType;
	current?: number;
	formName: string;
	findOne: (id: number) => any;
	add: (data: object, token: string) => any;
	update: (id: number, data: object, token: string) => void;
}

const SingleForm: React.FC<SingleFormProps> = ({
	target,
	current,
	formName,
	findOne,
	update,
	add,
}) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({ name: '' });

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await findOne(current!);
			setForm((prev) => ({ ...prev, name: res.data.name || res.data.title }));
		} catch ({ message }) {
			error({ message });
		}
	}, [current, error, findOne, setForm]);

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
				await update(current!, form, token!);
			}
			if (target === FormTargetType.create) {
				await add(form, token!);
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
						<Input value={form.name} name="name" onChange={changeHandler} />
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
						Save {formName}
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(SingleForm);
