import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';
import Avatar from '../Avatar';
import classNames from 'classnames';

interface AnnouncementCardProps {
	color: string;
	header: ReactNode | string;
	avatar?: string;
	avatarSize?: number;
	name?: string;
	buttonProps?: object;
	button2Props?: object;
	button3Props?: object;
	text?: string;
	date?: string;
	style?: object;
	className?: string;
	children?: ChildNode | string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
	color,
	header,
	avatar,
	avatarSize,
	name,
	date,
	text,
	className,
	buttonProps,
	button2Props,
	button3Props,
	...restProps
}) => {
	const bgColor = `bg-${color}`;
	const classes = classNames(bgColor, className);

	return (
		<Card inverse className={classes} {...restProps}>
			{header && typeof header === 'string' ? (
				<CardHeader className={bgColor}>{header}</CardHeader>
			) : (
				header
			)}
			<CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
				<Avatar size={avatarSize} src={avatar} />
				<CardText className="text-center"> 
					<strong className="d-block">{name}</strong>
					<small className="text-muted">{date}</small>
				</CardText>
				<CardText className="text-center">{text}</CardText>

				<div className="d-flex">
					<Button modal="edit" className="mr-1" color="primary" {...buttonProps} />
					<Button modal="password"  className="mr-1" color="primary" {...button2Props} />
					<Button modal="avatar" color="primary" {...button3Props} />
				</div>
			</CardBody>
		</Card>
	);
};

AnnouncementCard.defaultProps = {
	color: 'gradient-secondary',
	avatarSize: 60,
};

export default AnnouncementCard;
