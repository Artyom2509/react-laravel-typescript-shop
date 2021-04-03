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

interface ColorFormProps {
	target: FormTargetType;
	id?: number;
}

const ColorForm: React.FC<ColorFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [code, setCode] = useState('#000000');

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentColor(id);
			setName(res.data.name);
			setCode(res.data.code);
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

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				await api.updateColor(id, { name, code }, token);
			}
			if (target === FormTargetType.create) {
				await api.addColor({ name, code }, token);
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
						<Input
							value={name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Code</Label>
						<Input
							value={code}
							type="color"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCode(event.target.value)
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
						Save color
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(ColorForm);
