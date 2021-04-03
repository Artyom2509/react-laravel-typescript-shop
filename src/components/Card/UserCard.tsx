import React from 'react';
import classNames from 'classnames';
import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import Avatar from '../Avatar';
import { IUser } from '../../types';

interface UserCardProps extends IUser {
	avatar?: string;
	avatarSize?: number;
	name: string;
	subtitle?: string;
	text?: string;
	style?: object;
	className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
	avatar,
	avatarSize,
	name,
	subtitle,
	text,
	children,
	className,
	...restProps
}) => {
	const classes = classNames('bg-gradient-theme', className);

	return (
		<Card inverse className={classes} {...restProps}>
			<CardBody className="d-flex justify-content-center align-items-center flex-column">
				<Avatar src={avatar} size={avatarSize} className="mb-2" />
				<CardTitle>{name}</CardTitle>
				<CardSubtitle>{subtitle}</CardSubtitle>
				<CardText>
					<small>{text}</small>
				</CardText>
			</CardBody>
			{children}
		</Card>
	);
};

UserCard.defaultProps = {
	avatarSize: 80,
};

export default UserCard;
