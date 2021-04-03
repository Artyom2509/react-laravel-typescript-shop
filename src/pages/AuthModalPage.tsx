import AuthForm from '../components/Form/AuthForm';
import Page from '../components/Page';
import React, { useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Modal,
	ModalBody,
	Row,
} from 'reactstrap';
import { AuthStateType, AuthType } from '../types';

const AuthModalPage: React.FC = () => {
	const [show, setShow] = useState(false);
	const [authState, setAuthState] = useState(AuthType.STATE_LOGIN);

	const toggle = () => setShow((show) => !show);

	const handleAuthState = (authState: AuthStateType) => setAuthState(authState);

	const externalCloseBtn = (
		<button
			className="close"
			style={{
				position: 'absolute',
				top: '15px',
				right: '20px',
				fontSize: '3rem',
			}}
			onClick={toggle}>
			&times;
		</button>
	);

	return (
		<Page
			title="Login Modal"
			breadcrumbs={[{ name: 'login modal', active: true }]}>
			<Row>
				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader>Login Modal Example</CardHeader>
						<CardBody>
							<Button color="danger" onClick={toggle}>
								Click to Login
							</Button>
							<Modal
								isOpen={show}
								toggle={toggle}
								size="md"
								backdrop="static"
								backdropClassName="modal-backdrop-light"
								external={externalCloseBtn}
								centered>
								<ModalBody>
									<AuthForm
										authState={authState}
										onChangeAuthState={handleAuthState}
									/>
								</ModalBody>
							</Modal>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default AuthModalPage;
