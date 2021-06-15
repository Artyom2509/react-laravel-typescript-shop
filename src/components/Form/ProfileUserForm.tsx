import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthStateType, AuthType, FormTargetType } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import api from '../../api';
import { useForm } from '../../hooks/useForm';

interface AuthFormProps {
	authState?: AuthStateType;
	target?: FormTargetType;
	showLogo?: boolean;
	buttonText?: string;
	usernameLabel?: string;
	usernameInputProps?: { [x: string]: string };
	avatarLabel?: string;
	avatarInputProps?: { [x: string]: string };
	firstNameLabel?: string;
	firstNameInputProps?: { [x: string]: string };
	lastNameLabel?: string;
	lastNameInputProps?: { [x: string]: string };
	emailLabel?: string;
	emailInputProps?: { [x: string]: string };
	passwordLabel?: string;
	passwordInputProps?: { [x: string]: string };
	confirmPasswordLabel?: string;
	confirmPasswordInputProps?: { [x: string]: string };
	onLogoClick?: () => void;
	onChangeAuthState?: (authState: AuthStateType) => void;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
	const { loading, token, user } = useTypedSelector(({ auth }) => auth);

	const [form, changeHandler] = useForm({
		first_name: user.first_name ?? '',
		last_name: user.last_name ?? '',
		email: user.email ?? '',
		password: '',
		password_confirm: '',
		phone: user.contacts?.phone ?? '',
		city: user.contacts?.city ?? '',
		address: user.contacts?.address ?? '',
	});
	const [avatar, setAvatar] = useState<any>(null);

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		if (props.target === FormTargetType.password) {
			api.changePassword(
				{ password: form.password, password_confirm: form.password_confirm },
				token!
			);
		}

		if (props.target === FormTargetType.avatar) {
			const formData = setFormData({ avatar });
			api.changeAvatar(formData, token!);
		}

		if (props.target === FormTargetType.update) {
			api.updateInfo(form, token!);
		}
	};

	const {
		emailLabel,
		firstNameLabel,
		firstNameInputProps,
		avatarLabel,
		lastNameLabel,
		lastNameInputProps,
		emailInputProps,
		passwordLabel,
		passwordInputProps,
		confirmPasswordLabel,
		confirmPasswordInputProps,
		children,
	} = props;

	return (
		<Form onSubmit={handleSubmit} encType="multipart/form-data">
			{props.target === FormTargetType.update && (
				<>
					<FormGroup>
						<Label for={lastNameLabel}>{lastNameLabel}</Label>
						<Input
							{...lastNameInputProps}
							value={form.last_name}
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={firstNameLabel}>{firstNameLabel}</Label>
						<Input
							{...firstNameInputProps}
							value={form.first_name}
							name="first_name"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={emailLabel}>{emailLabel}</Label>
						<Input
							{...emailInputProps}
							value={form.email}
							name="mail"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={passwordLabel}>{passwordLabel}</Label>
						<Input
							{...passwordInputProps}
							name="password"
							value={form.password}
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
						<Input
							{...confirmPasswordInputProps}
							value={form.password_confirm}
							name="password_confirm"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Phone">Phone</Label>
						<Input value={form.phone} name="phone" onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label for="City">City</Label>
						<Input value={form.city} name="city" onChange={changeHandler} />
					</FormGroup>
					<FormGroup>
						<Label for="Address">Address</Label>
						<Input
							value={form.address}
							name="address"
							onChange={changeHandler}
						/>
					</FormGroup>
				</>
			)}

			{props.target === FormTargetType.avatar && (
				<>
					<FormGroup>
						<div>
							<Label>{avatarLabel}</Label>
						</div>
						<input
							type="file"
							onChange={(event: any) => setAvatar(event.target.files[0])}
						/>
					</FormGroup>
				</>
			)}

			{props.target === FormTargetType.password && (
				<>
					<FormGroup>
						<Label for={passwordLabel}>{passwordLabel}</Label>
						<Input
							{...passwordInputProps}
							value={form.password}
							name="password"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
						<Input
							{...confirmPasswordInputProps}
							value={form.password_confirm}
							name="password_confirm"
							onChange={changeHandler}
						/>
					</FormGroup>
				</>
			)}

			<hr />

			<div className="text-center pt-1">
				{loading ? (
					<Pane>
						<Spinner marginX="auto" marginY={30} />
					</Pane>
				) : (
					<Button
						size="lg"
						className="bg-gradient-theme-left border-0"
						block
						onClick={handleSubmit}>
						Update info
					</Button>
				)}
			</div>

			{children}
		</Form>
	);
};

AuthForm.defaultProps = {
	authState: AuthType.STATE_LOGIN,
	target: FormTargetType.update,
	showLogo: true,
	usernameLabel: 'Email',
	emailLabel: 'Email',
	usernameInputProps: {
		type: 'email',
		placeholder: 'your@email.com',
	},
	firstNameLabel: 'First name',
	firstNameInputProps: {
		type: 'text',
		// placeholder: 'your@email.com',
	},
	lastNameLabel: 'Last name',
	lastNameInputProps: {
		type: 'text',
		// placeholder: 'your@email.com',
	},
	avatarLabel: 'Avatar',
	avatarInputProps: {
		type: 'file',
		// placeholder: 'your@email.com',
	},
	emailInputProps: {
		type: 'email',
		placeholder: 'your@email.com',
	},
	passwordLabel: 'Password',
	passwordInputProps: {
		type: 'password',
		// placeholder: 'your password',
	},
	confirmPasswordLabel: 'Confirm Password',
	confirmPasswordInputProps: {
		type: 'password',
		// placeholder: 'confirm your password',
	},
};

export default React.memo(AuthForm);
