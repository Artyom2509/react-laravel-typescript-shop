import { Container } from '@material-ui/core';
import { Pane } from 'evergreen-ui';
import {
	NavLink,
	Popover,
	PopoverBody,
	ListGroup,
	ListGroupItem,
	InputGroup,
	Input,
	Button,
	InputGroupAddon,
} from 'reactstrap';
import React, {
	BaseSyntheticEvent,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';
import logo from '../../assets/img/logo/logo-2.png';
import { Link, useHistory } from 'react-router-dom';
import AuthModal from '../../pages/AuthModal';
import { UserCard } from '../Card';
import {
	MdExitToApp,
	MdHelp,
	MdInsertChart,
	MdMessage,
	MdPersonPin,
} from 'react-icons/md';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Avatar from '../Avatar';
import { useActions } from '../../hooks/useActions';
import MiniCart from '../MiniCart';

interface AmentsLayoutProps {
	breakpoint?: string;
	children?: ReactNode;
}

const AmentsLayout: React.FC<AmentsLayoutProps> = ({
	breakpoint,
	children,
}) => {
	const [isOpenUserCardPopover, setIsOpenUserCardPopover] = useState(false);
	const [text, setText] = useState('');

	const history = useHistory();
	const { logoutUser, searchProduct } = useActions();

	const togglePopover = () => setIsOpenUserCardPopover((state) => !state);

	const checkBreakpoint = useCallback((breakpoint?: string) => {
		switch (breakpoint) {
			case 'xs':
			case 'sm':
			case 'md':
				return openSidebar('close');

			case 'lg':
			case 'xl':
			default:
				return openSidebar('open');
		}
	}, []);

	const {
		auth: { user, token },
		search,
	} = useTypedSelector(({ auth, search }) => ({
		auth,
		search,
	}));

	useEffect(() => {
		const timeout = setTimeout(() => searchProduct(text), 500);
		return () => clearTimeout(timeout);
	}, [text, searchProduct, history]);

	useEffect(() => {
		setText(search.text);
	}, [search, setText]);

	useEffect(() => {
		checkBreakpoint(breakpoint);
	}, [breakpoint, checkBreakpoint]);

	const openSidebar = (openOrClose: string) => {
		if (openOrClose === 'open') {
			return document
				?.querySelector('.cr-sidebar')
				?.classList.add('cr-sidebar--open');
		}
		document
			?.querySelector('.cr-sidebar')
			?.classList.remove('cr-sidebar--open');
	};

	return (
		<>
			<div className="bg-light">
				<Container>
					<Pane
						display="flex"
						borderRadius={3}
						alignItems="center"
						justifyContent="space-between">
						<Pane alignItems="center" display="flex">
							<Link to="/" className="navbar-brand d-flex">
								<img
									src={logo}
									width="185"
									height="60"
									className="pr-2"
									alt=""
								/>
							</Link>
							<Link to="/shop" className="nav-link text-primary">
								Shop
							</Link>
						</Pane>

						<Pane>
							<InputGroup>
								<Input
									value={text}
									onChange={(event: BaseSyntheticEvent) =>
										setText(event.target.value)
									}
								/>
								<InputGroupAddon addonType="append">
									<Button
										color="secondary"
										onClick={() => text.length && history.push('/shop')}>
										Search
									</Button>
								</InputGroupAddon>
							</InputGroup>
						</Pane>

						<Pane className="d-flex align-items-center">
							<MiniCart />

							{!token ? (
								<AuthModal />
							) : (
								<div>
									<NavLink id="Popover2">
										<Avatar
											src={user.avatar!}
											onClick={togglePopover}
											className="can-click"
										/>
									</NavLink>

									<Popover
										placement="bottom-end"
										isOpen={isOpenUserCardPopover}
										toggle={togglePopover}
										target="Popover2"
										className="p-0 border-0"
										style={{ minWidth: 250 }}>
										<PopoverBody className="p-0 border-light">
											<UserCard
												avatar={user.avatar!}
												name={user.full_name!}
												subtitle={user.email!}
												text={user.role!}
												className="border-light">
												<ListGroup flush>
													<Link to="/cabinet/profile">
														<ListGroupItem
															tag="button"
															action
															className="border-light">
															<MdPersonPin /> Profile
														</ListGroupItem>
													</Link>
													<Link to="/cabinet/wishlist">
														<ListGroupItem
															tag="button"
															action
															className="border-light">
															<MdInsertChart /> Wishlist
														</ListGroupItem>
													</Link>
													<Link to="/cabinet/orders">
														<ListGroupItem
															tag="button"
															action
															className="border-light">
															<MdMessage /> Orders
														</ListGroupItem>
													</Link>
													<Link to="">
														<ListGroupItem
															tag="button"
															action
															className="border-light">
															<MdHelp /> Help
														</ListGroupItem>
													</Link>
													<ListGroupItem
														onClick={logoutUser}
														tag="button"
														action
														className="border-light">
														<MdExitToApp /> Logout
													</ListGroupItem>
												</ListGroup>
											</UserCard>
										</PopoverBody>
									</Popover>
								</div>
							)}
						</Pane>
					</Pane>
				</Container>
			</div>
			<Container>{children!}</Container>
		</>
	);
};

export default AmentsLayout;
