import React from 'react';
import { Media, Button } from 'reactstrap';
import { StatusTypes } from '../types';
import Avatar from './Avatar';

interface SupportTicketProps {
	avatar: string;
	name: string;
	date: string;
	text: string;
	status: StatusTypes;
	onClick?: () => void;
}

const SupportTicket: React.FC<SupportTicketProps> = ({
	avatar,
	name,
	date,
	text,
	status,
	onClick,
	...restProps
}) => {
	return (
		<div {...restProps}>
			<Media className="m-2">
				<Media left className="mr-2">
					<Avatar src={avatar} />
				</Media>
				<Media body>
					<Media heading tag="h6" className="m-0">
						{name}
					</Media>
					<p className="text-muted m-0">
						<small>{date}</small>
					</p>
				</Media>
				<Media right className="align-self-center">
					<Button
						color="link"
						className={`text-capitalize text-${status}`}>
						{status}
					</Button>
				</Media>
			</Media>
			<Media>
				<p className="text-muted">{text}</p>
			</Media>
		</div>
	);
};

SupportTicket.defaultProps = {
	avatar: '',
	name: '',
	date: '',
	text: '',
	status: StatusTypes.pending,
	onClick: () => {},
};

export default SupportTicket;
