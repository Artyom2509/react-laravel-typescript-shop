import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import api from '../../api';
import { FormTargetType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useForm } from '../../hooks/useForm';

interface CouponFormProps {
	id?: number;
	target: FormTargetType;
}

const CouponForm: React.FC<CouponFormProps> = ({ target, id }) => {
	const [loading, setLoading] = useState(false);

	const [form, changeHandler, setForm] = useForm({
		value: '0',
		code: '',
		is_enabled: false,
	});
	console.log('form', form);

	const { token } = useTypedSelector(({ auth }) => auth);
	const { error } = useActions();

	const loadInfo = useCallback(async () => {
		try {
			const res = await api.currentCoupon(id, token);
			console.log('loadInfo -> res', res);
			setForm((prev) => ({ ...prev, code: res.data.code as string }));
			setForm((prev) => ({ ...prev, value: res.data.value as string }));
			setForm((prev) => ({ ...prev, is_enabled: res.data.is_enabled }));
		} catch ({ message }) {
			error({ message });
		}
	}, [id, error, token, setForm]);

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
					{ ...form, is_enabled: form.is_enabled ? 1 : 0 },
					token
				);
			}
			if (target === FormTargetType.create) {
				await api.addCoupon(
					{ ...form, is_enabled: form.is_enabled ? 1 : 0 },
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
						<Input name="code" value={form.code} onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label>Value</Label>
						<Input
							name="value"
							value={form.value}
							min={0}
							max={1}
							step="0.01"
							type="number"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="checkbox"
								checked={form.is_enabled}
								name="is_enabled"
								onChange={() =>
									setForm((prev) => ({ ...prev, is_enabled: !prev.is_enabled }))
								}
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
