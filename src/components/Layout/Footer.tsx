import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import SourceLink from '../SourceLink';

const Footer: React.FC = () => {
	return (
		<Navbar>
			<Nav navbar>
				<NavItem>
					2021 Laravel - React TypeScript by{' '}
					<SourceLink
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/Artyom2509">
						Artyom2509
					</SourceLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
};

export default Footer;
