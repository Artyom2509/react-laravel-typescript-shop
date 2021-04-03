import Page from '../components/Page';
import React, { useState } from 'react';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap';

interface ModalPageProps {
	className?: string;
	backdrop?: boolean;
}

const ModalPage: React.FC<ModalPageProps> = (props) => {
	const [modal, setModal] = useState(false);
	const [modal_backdrop, setModal_backdrop] = useState(false);
	const [modal_nested_parent, setModal_nested_parent] = useState(false);
	const [modal_nested, setModal_nested] = useState(false);
	const [backdrop, setBackdrop] = useState(true);
	console.log({
		modal,
		modal_backdrop,
		modal_nested_parent,
		modal_nested,
	});

	const toggle = (modalType?: string) => () => {
		console.log('toggle -> modalType', modalType);
		switch (modalType) {
			case 'nested_parent':
				setModal_nested_parent((state) => !state);
				break;

			case 'nested':
				setModal_nested((state) => !state);
				break;

			case 'backdrop':
				setModal_backdrop((state) => !state);
				break;

			default:
				setModal((state) => !state);
				break;
		}
	};

	return (
		<Page title="Modals" breadcrumbs={[{ name: 'modals', active: true }]}>
			<Row>
				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader>Modal</CardHeader>
						<CardBody>
							<Button onClick={toggle()}>Launch Modal</Button>
							<Modal
								isOpen={modal}
								toggle={toggle()}
								className={props.className}>
								<ModalHeader toggle={toggle()}>Modal title</ModalHeader>
								<ModalBody>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={toggle()}>
										Do Something
									</Button>{' '}
									<Button color="secondary" onClick={toggle()}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal>
						</CardBody>
					</Card>
				</Col>

				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader className="d-flex justify-content-between">
							Backdrop
							<ButtonGroup size="sm">
								<Button
									onClick={() => setBackdrop(true)}
									color="primary"
									active={backdrop}>
									true
								</Button>
								<Button
									onClick={() => setBackdrop(false)}
									color="primary"
									active={!backdrop}>
									false
								</Button>
								<Button
									onClick={() => setBackdrop(true)}
									color="primary"
									active={backdrop === true}>
									static
								</Button>
							</ButtonGroup>
						</CardHeader>
						<CardBody>
							<p>Backdrop state: {`${backdrop}`}</p>
							<Button onClick={toggle('backdrop')}>Launch Modal</Button>
							<Modal
								isOpen={modal_backdrop}
								toggle={toggle('backdrop')}
								backdrop={props.backdrop}>
								<ModalHeader toggle={toggle('backdrop')}>
									Modal title
								</ModalHeader>
								<ModalBody>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={toggle('backdrop')}>
										Do Something
									</Button>{' '}
									<Button color="secondary" onClick={toggle('backdrop')}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal>
						</CardBody>
					</Card>
				</Col>

				<Col md="12" sm="12" xs="12">
					<Card>
						<CardHeader>Nested</CardHeader>
						<CardBody>
							<Button color="danger" onClick={toggle('nested_parent')}>
								Launch Modal
							</Button>
							<Modal
								isOpen={modal_nested_parent}
								toggle={toggle('nested_parent')}
								className={props.className}>
								<ModalHeader toggle={toggle('nested_parent')}>
									Modal title
								</ModalHeader>
								<ModalBody>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
									<br />
									<Button color="success" onClick={toggle('nested')}>
										Show Nested Model
									</Button>
									<Modal isOpen={modal_nested} toggle={toggle('nested')}>
										<ModalHeader>Nested Modal title</ModalHeader>
										<ModalBody>Stuff and things</ModalBody>
										<ModalFooter>
											<Button color="primary" onClick={toggle('nested')}>
												Done
											</Button>{' '}
											<Button
												color="secondary"
												onClick={toggle('nested_parent')}>
												All Done
											</Button>
										</ModalFooter>
									</Modal>
								</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={toggle('nested_parent')}>
										Do Something
									</Button>{' '}
									<Button color="secondary" onClick={toggle('nested_parent')}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default ModalPage;
