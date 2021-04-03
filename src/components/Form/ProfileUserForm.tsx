import React, {
	ChangeEvent,
	SyntheticEvent,
	useState,
} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthStateType, AuthType, FormTargetType } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import api from '../../api';

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

	const [first_name, setFirst_name] = useState(user.first_name ?? '');
	const [last_name, setLast_name] = useState(user.last_name ?? '');
	const [email, setEmail] = useState(user.email ?? '');
	const [password, setPassword] = useState('password');
	const [password_confirm, setPassword_confirm] = useState('password');
	const [avatar, setAvatar] = useState<any>(null);
	const [phone, setPhone] = useState(user.contacts?.phone ?? '');
	const [city, setCity] = useState(user.contacts?.city ?? '');
	const [address, setAddress] = useState(user.contacts?.address ?? '');


	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		if (props.target === FormTargetType.password) {
			api.changePassword({ password, password_confirm }, token!);
		}

		if (props.target === FormTargetType.avatar) {
			const formData = setFormData({ avatar });
			api.changeAvatar(formData, token!);
		}

		if (props.target === FormTargetType.update) {
			api.updateInfo(
				{
					first_name,
					last_name,
					password_confirm,
					email,
					password,
					phone,
					city,
					address,
				},
				token!
			);
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
							value={last_name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setLast_name(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={firstNameLabel}>{firstNameLabel}</Label>
						<Input
							{...firstNameInputProps}
							value={first_name}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setFirst_name(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={emailLabel}>{emailLabel}</Label>
						<Input
							{...emailInputProps}
							value={email}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={passwordLabel}>{passwordLabel}</Label>
						<Input
							{...passwordInputProps}
							value={password}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
						<Input
							{...confirmPasswordInputProps}
							value={password_confirm}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword_confirm(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Phone">Phone</Label>
						<Input
							value={phone}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPhone(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="City">City</Label>
						<Input
							value={city}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCity(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Address">Address</Label>
						<Input
							value={address}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setAddress(event.target.value)
							}
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
							value={password}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
						<Input
							{...confirmPasswordInputProps}
							value={password_confirm}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword_confirm(event.target.value)
							}
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
