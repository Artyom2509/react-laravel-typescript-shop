import React from 'react';
import { Card, CardText, CardTitle, Progress } from 'reactstrap';
import { ColorsTypes, TagTypes } from '../../types';
import Typography from '../Typography';

interface NumberWidgetProps {
	title?: string;
	subtitle?: string;
	number?: string | number;
	color?: ColorsTypes | string;
	progress: {
		value: number;
		label: string;
	};
}

const NumberWidget: React.FC<NumberWidgetProps> = ({
	title,
	subtitle,
	number,
	color,
	progress: { value, label },
	...restProps
}) => {
	return (
		<Card body {...restProps}>
			<div className="d-flex justify-content-between">
				<CardText tag="div">
					<Typography className="mb-0">
						<strong>{title}</strong>
					</Typography>
					<Typography className="mb-0 text-muted small">{subtitle}</Typography>
				</CardText>
				<CardTitle className={`text-${color}`}>{number}</CardTitle>
			</div>
			<Progress value={value} color={color} style={{ height: '8px' }} />
			<CardText tag="div" className="d-flex justify-content-between">
				<Typography tag={TagTypes.span} className="text-left text-muted small">
					{label}
				</Typography>
				<Typography tag={TagTypes.span} className="text-right text-muted small">
					{value}%
				</Typography>
			</CardText>
		</Card>
	);
};

NumberWidget.defaultProps = {
	title: '',
	subtitle: '',
	number: 0,
	color: ColorsTypes.primary,
	progress: {
		value: 0,
		label: '',
	},
};

export default NumberWidget;
