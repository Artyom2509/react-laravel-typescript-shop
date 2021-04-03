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

interface CouponFormProps {
	target: FormTargetType;
	id?: number;
}

const CouponForm: React.FC<CouponFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [value, setValue] = useState(0);
	const [code, setCode] = useState('');
	const [is_enabled, setIs_enabled] = useState(false);

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentCoupon(id, token);
			setCode(res.data.code);
			setValue(res.data.value);
			setIs_enabled(res.data.is_enabled);
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
				await api.updateCoupon(
					id,
					{ value, code, is_enabled: is_enabled ? 1 : 0 },
					token
				);
			}
			if (target === FormTargetType.create) {
				await api.addCoupon(
					{ value, code, is_enabled: is_enabled ? 1 : 0 },
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
					<FormGroup>
						<Label>Code</Label>
						<Input
							value={code}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCode(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Value</Label>
						<Input
							value={value}
							min={0}
							max={1}
							step="0.01"
							type="number"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setValue(+event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="checkbox"
								checked={is_enabled}
								onChange={() => setIs_enabled((prev) => !prev)}
							/>{' '}
							Enabled
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
						onClick={handleSubmit}>
						Save coupon
					</Button>
				)}
			</div>
		</Form>
	);
};

export default React.memo(CouponForm);
