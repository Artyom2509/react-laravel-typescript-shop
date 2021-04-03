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
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';

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

	const [name, setName] = useState('');

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await findOne(current!);
			setName(res.data.name || res.data.title);
		} catch ({ message }) {
			error({ message });
		}
	}, [current, error, findOne]);

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
				await update(current!, { name }, token!);
			}
			if (target === FormTargetType.create) {
				await add({ name }, token!);
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
