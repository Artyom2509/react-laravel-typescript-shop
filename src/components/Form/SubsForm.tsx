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
import { FormTargetType, ICategory } from '../../types';
import { useActions } from '../../hooks/useActions';
import api from '../../api';

interface SubsFormProps {
	target?: FormTargetType;
	current?: number;
}

const SubsForm: React.FC<SubsFormProps> = ({ target, current }) => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<ICategory[]>([]);

	const [name, setName] = useState('');
	const [category_id, setCategory_id] = useState(0);

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadSub = useCallback(async () => {
		try {
			const res = await api.currentSub(current!);
			setCategory_id(res.data.category_id);
			setName(res.data.name);
		} catch ({ message }) {
			error({ message });
		}
	}, [current, error]);

	const loadCategory = useCallback(async () => {
		try {
			const category = await api.fetchAllCategory();
			setCategories(category.data);
		} catch ({ message }) {
			error({ message });
		}
	}, [error]);

	const initState = useCallback(async () => {
		if (target === FormTargetType.update) {
			loadSub();
			loadCategory();
		}
		if (target === FormTargetType.create) {
			await loadCategory();
		}
	}, [loadCategory, loadSub, target]);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		setLoading(true);
		try {
			if (target === FormTargetType.update) {
				await api.updateSub(current!, { category_id, name }, token!);
			}
			if (target === FormTargetType.create) {
				await api.addSub({ category_id, name }, token!);
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
						<Label>Category</Label>
						<Input
							value={category_id}
							type="select"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCategory_id(+event.target.value)
							}>
							<option value={0} disabled>
								Select category
							</option>
							{categories.map(({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label>Name</Label>
						<Input
							value={name}
							disabled={category_id === 0}
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
						disabled={category_id === 0}
						onClick={handleSubmit}>
						Save Subs
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(SubsForm);
