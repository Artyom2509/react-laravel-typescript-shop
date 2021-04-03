import React from 'react';
import { IColor } from '../types';

interface Props {
	color: IColor;
	className?: string;
	size?: number;
}

const ColorItem = ({ color, className, size }: Props) => {
	const styleSize = size && { width: size, height: size };

	return (
		<div className={className ?? 'd-flex align-items-center'}>
			<div
				className="color-badge"
				style={{
					...styleSize,
					backgroundColor: color.code,
				}}
			/>
			<small>{color.name}</small>
		</div>
	);
};

export default ColorItem;
