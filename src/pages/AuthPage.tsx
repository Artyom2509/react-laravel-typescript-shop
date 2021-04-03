import AuthForm from '../components/Form/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { AuthStateType, AuthType } from '../types';
import { Redirect, RouterProps } from 'react-router';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface AuthPageProps extends RouterProps {
	authState: AuthStateType;
}

const AuthPage: React.FC<AuthPageProps> = ({ authState, history }) => {
	const handleAuthState = (authState: AuthStateType) => {
		if (authState === AuthType.STATE_LOGIN) {
			history.push('/login');
		} else {
			history.push('/signup');
		}
	};

	const handleLogoClick = () => {
		history.push('/');
	};
	
	const { user, token } = useTypedSelector(({ auth }) => auth);
	
	if (token && user.role === 'Admin') return <Redirect to="/admin/dashboard" />;
	if (token && user) return <Redirect to="/cabinet/profile" />;

	return (
		<Row
			style={{
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Col md={6} lg={4}>
				<Card body>
					<AuthForm
						authState={authState}
						showLogo
						onChangeAuthState={handleAuthState}
						onLogoClick={handleLogoClick}
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default React.memo(AuthPage);
