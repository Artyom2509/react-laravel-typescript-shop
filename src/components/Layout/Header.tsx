import Avatar from '../Avatar';
import { UserCard } from '../Card';
import SearchInput from '../SearchInput';
import withBadge from '../../hocs/withBadge';
import React, { useState } from 'react';
import {
	MdClearAll,
	MdExitToApp,
	MdHelp,
	MdInsertChart,
	MdMessage,
	MdNotificationsActive,
	MdNotificationsNone,
	MdPersonPin,
} from 'react-icons/md';
import {
	Button,
	ListGroup,
	ListGroupItem,
	// NavbarToggler,
	Nav,
	Navbar,
	NavItem,
	NavLink,
	Popover,
	PopoverBody,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import { ColorsTypes, SizeMapTypes } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Link } from 'react-router-dom';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
	size: SizeMapTypes.md,
	color: ColorsTypes.primary,
	style: {
		top: -10,
		right: -10,
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	children: <small>5</small>,
})(MdNotificationsActive);

const Header: React.FC = () => {
	const [isOpenNotification, setIsOpenNotification] = useState(false);
	const [isNotificationConfirmed, setIsNotificationConfirmed] = useState(false);
	const [isOpenUserCardPopover, setIsOpenUserCardPopover] = useState(false);

	const { user } = useTypedSelector(({ auth }) => auth);
	const { logoutUser } = useActions();

	const toggleNotificationPopover = () => {
		setIsOpenNotification((state) => !state);

		if (!isNotificationConfirmed) {
			setIsNotificationConfirmed(true);
		}
	};

	const toggleUserCardPopover = () => {
		setIsOpenUserCardPopover((state) => !state);
	};

	const handleSidebarControlButton = (
		event: React.MouseEvent<SVGElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();

		document.querySelector('.cr-sidebar')!.classList.toggle('cr-sidebar--open');
	};

	return (
		<Navbar light expand className={bem.b('bg-white')}>
			<Nav navbar className="mr-2">
				<Button outline onClick={handleSidebarControlButton}>
					<MdClearAll size={25} />
				</Button>
			</Nav>
			<Nav navbar>
				<SearchInput />
			</Nav>

			<Nav navbar className={bem.e('nav-right')}>
				<NavItem className="d-inline-flex">
					<NavLink id="Popover1" className="position-relative">
						{isNotificationConfirmed ? (
							<MdNotificationsNone
								size={25}
								className="text-secondary can-click"
								onClick={toggleNotificationPopover}
							/>
						) : (
							<MdNotificationsActiveWithBadge
								size={25}
								className="text-secondary can-click animated swing infinite"
								onClick={toggleNotificationPopover}
							/>
						)}
					</NavLink>
					<Popover
						placement="bottom"
						isOpen={isOpenNotification}
						toggle={toggleNotificationPopover}
						target="Popover1">
						<PopoverBody>
						</PopoverBody>
					</Popover>
				</NavItem>

				<NavItem>
					<NavLink id="Popover2">
						<Avatar
							src={user.avatar!}
							onClick={toggleUserCardPopover}
							className="can-click"
						/>
					</NavLink>
					<Popover
						placement="bottom-end"
						isOpen={isOpenUserCardPopover}
						toggle={toggleUserCardPopover}
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
										<ListGroupItem tag="button" action className="border-light">
											<MdPersonPin /> Profile
										</ListGroupItem>
									</Link>
									<Link to="/cabinet/wishlist">
										<ListGroupItem tag="button" action className="border-light">
											<MdInsertChart /> Wishlist
										</ListGroupItem>
									</Link>
									<Link to="/cabinet/orders">
										<ListGroupItem tag="button" action className="border-light">
											<MdMessage /> Orders
										</ListGroupItem>
									</Link>
									<Link to="">
										<ListGroupItem tag="button" action className="border-light">
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
				</NavItem>
			</Nav>
		</Navbar>
	);
};

export default Header;
