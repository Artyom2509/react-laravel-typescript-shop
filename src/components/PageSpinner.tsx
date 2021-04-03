import React from 'react';
import { Spinner } from 'reactstrap';
import { ColorsTypes } from '../types';

interface PageSpinnerProps {
	color?: ColorsTypes[];
}

const PageSpinner: React.FC<PageSpinnerProps> = ({
	color = ColorsTypes.primary,
}) => {
	return (
		<div className="cr-page-spinner">
			<Spinner color={color.toString()} />
		</div>
	);
};

export default PageSpinner;
