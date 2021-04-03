import AuthForm from '../components/Form/AuthForm';
import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { AuthStateType, AuthType } from '../types';

const AuthModal: React.FC = () => {
	const [authState, setAuthState] = useState(AuthType.STATE_LOGIN);
	const [show, setShow] = useState(false);

	const toggle = () => setShow((show) => !show);

	const handleAuthState = (authState: AuthStateType) => setAuthState(authState);

	return (
		<div>
			<Button color="secondary" onClick={toggle}>
				Login / Register
			</Button>
			<Modal isOpen={show} toggle={toggle} size="md" fade={false} centered>
				<ModalBody>
					<AuthForm authState={authState} onChangeAuthState={handleAuthState} />
				</ModalBody>
			</Modal>
		</div>
	);
};

export default AuthModal;
