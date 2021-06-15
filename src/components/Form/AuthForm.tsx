import logo from '../../assets/img/logo/logo-2.png';
import React, { SyntheticEvent, useMemo, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthStateType, AuthType } from '../../types';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Pane, Spinner } from 'evergreen-ui';
import { setFormData } from '../../utils/forms';
import { Redirect } from 'react-router';
import { useForm } from '../../hooks/useForm';

interface AuthFormProps {
	authState: AuthStateType;
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
	onChangeAuthState: (authState: AuthStateType) => void;
}

interface IUseForm {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	password_confirm: string;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
	const [form, changeHandler] = useForm<IUseForm>({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirm: '',
	});
	const [avatar, setAvatar] = useState<any>(null);

	const { loading, token, user } = useTypedSelector(({ auth }) => auth);
	const { loginUser, registerUser } = useActions();

	const isLogin = useMemo(() => {
		return props.authState === AuthType.STATE_LOGIN;
	}, [props.authState]);

	const isSignup = useMemo(() => {
		return props.authState === AuthType.STATE_SIGNUP;
	}, [props.authState]);

	const changeAuthState =
		(authState: AuthStateType) => (event: SyntheticEvent) => {
			event.preventDefault();

			props.onChangeAuthState(authState);
		};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const { email, password } = form;

		if (isLogin) loginUser({ email, password });

		if (isSignup) {
			const formData = setFormData(form);
			registerUser(formData);
		}
	};

	const renderButtonText = () => {
		const { buttonText } = props;

		if (!buttonText && isLogin) {
			return 'Login';
		}

		if (!buttonText && isSignup) {
			return 'Register';
		}

		return buttonText;
	};

	const {
		showLogo,
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
		onLogoClick,
	} = props;

	if (token && user.role === 'Admin') return <Redirect to="/admin/dashboard" />;
	if (token && user) return <Redirect to="/cabinet/profile" />;

	return (
		<Form onSubmit={handleSubmit} encType="multipart/form-data">
			{showLogo && (
				<div className="text-center pb-4">
					<img
						src={logo}
						className="rounded"
						style={{ width: 300, height: 90, cursor: 'pointer' }}
						alt="logo"
						onClick={onLogoClick}
					/>
				</div>
			)}
			{isSignup && (
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
					<FormGroup>
						<Label for={lastNameLabel}>{lastNameLabel}</Label>
						<Input
							{...lastNameInputProps}
							name="last_name"
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for={firstNameLabel}>{firstNameLabel}</Label>
						<Input
							{...firstNameInputProps}
							name="first_name"
							onChange={changeHandler}
						/>
					</FormGroup>
				</>
			)}
			<FormGroup>
				<Label for={emailLabel}>{emailLabel}</Label>
				<Input {...emailInputProps} name="email" onChange={changeHandler} />
			</FormGroup>
			<FormGroup>
				<Label for={passwordLabel}>{passwordLabel}</Label>
				<Input
					{...passwordInputProps}
					name="password"
					onChange={changeHandler}
				/>
			</FormGroup>
			{isSignup && (
				<FormGroup>
					<Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
					<Input
						{...confirmPasswordInputProps}
						name="password_confirm"
						onChange={changeHandler}
					/>
				</FormGroup>
			)}

			<FormGroup check>
				<Label check>
					<Input type="checkbox" />{' '}
					{isSignup ? 'Agree the terms and policy' : 'Remember me'}
				</Label>
			</FormGroup>
			<hr />

			<div className="text-center pt-1">
				{loading ? (
					<Pane>
						<Spinner marginX="auto" marginY={30} />
					</Pane>
				) : (
					<>
						<Button
							size="lg"
							className="bg-gradient-theme-left border-0"
							block
							onClick={handleSubmit}>
							{renderButtonText()}
						</Button>
						<h6>or</h6>
						<h6>
							{isSignup ? (
								<a
									href="#login"
									onClick={changeAuthState(AuthType.STATE_LOGIN)}>
									Login
								</a>
							) : (
								<a
									href="#signup"
									onClick={changeAuthState(AuthType.STATE_SIGNUP)}>
									Register
								</a>
							)}
						</h6>
					</>
				)}
			</div>

			{children}
		</Form>
	);
};

AuthForm.defaultProps = {
	authState: AuthType.STATE_LOGIN,
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
	onLogoClick: () => {},
};

export default React.memo(AuthForm);
