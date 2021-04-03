import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SourceLinkProps {
	className?: string;
	href?: string;
	target?: string;
	rel?: string;
	children?: ReactNode | Element;
}

const SourceLink: React.FC<SourceLinkProps> = (props) => {
	/* eslint-disable jsx-a11y/anchor-has-content */
	return props.href ? (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a href={props.href} {...props} />
	) : (
		<Link to={process.env.PUBLIC_URL} {...props} />
	);
};

export default SourceLink;
