import React, { ReactChild } from 'react';
import classNames from 'classnames';
import { Badge } from 'reactstrap';
import {
	ColorsTypes,
	PositionMapTypes,
	SizeMapTypes,
	TagTypes,
} from '../types';

const positionMap = {
	'top-right': {
		top: -3,
		right: -3,
	},
	'top-left': {
		top: -3,
		left: -3,
	},
	'bottom-left': {
		bottom: -3,
		left: -3,
	},
	'bottom-right': {
		bottom: -3,
		right: -3,
	},
};

const sizeMap = {
	xs: {
		width: 10,
		height: 10,
	},
	sm: {
		width: 15,
		height: 15,
	},
	md: {
		width: 20,
		height: 20,
	},
	lg: {
		width: 25,
		height: 25,
	},
	xl: {
		width: 30,
		height: 30,
	},
};

interface WithBadge {
	position?: PositionMapTypes;
	size?: number;
	style?: React.CSSProperties;
	className?: string;
	color?: string;
	children?: ReactChild;
	tag?: TagTypes;
	src?: string;
	restBadgeProps?: string[];
	onClick?: () => void;
}

interface WithBadgeProps {
	position?: PositionMapTypes;
	size?: SizeMapTypes;
	style?: React.CSSProperties;
	className?: string;
	src?: string;
	color?: ColorsTypes;
	children?: ReactChild;
	tag?: TagTypes;
	restBadgeProps?: string[];
	onClick?: () => void;
}

const withBadge = ({
	position = PositionMapTypes.bottomRight,
	size = SizeMapTypes.sm,
	style = {},
	className,
	...restBadgeProps
}: WithBadgeProps = {}) => (WrappedComponent: React.FC<WithBadge>) => ({
	tag: Tag = TagTypes.div,
	...restProps
}: WithBadge) => {
	return (
		<Tag className="d-inline-block position-relative">
			<WrappedComponent {...restProps} />
			<Badge
				className={classNames('position-absolute', className)}
				style={{
					...positionMap[position],
					...sizeMap[size],
					borderRadius: '50%',
					border: '2px solid #fff',
					...style,
				}}
				{...restBadgeProps}
			/>
		</Tag>
	);
};

export default withBadge;
