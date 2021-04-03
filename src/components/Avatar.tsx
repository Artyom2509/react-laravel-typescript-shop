import React from 'react';
import classNames from 'classnames';
import userImage from '../assets/img/users/100_4.jpg';
import { TagTypes } from '../types';

interface AvatarProps {
	id?: string;
	tag?: TagTypes;
	rounded?: boolean;
	circle?: boolean;
	size?: number;
	src?: string;
	alt?: string;
	object?: boolean;
	className?: string;
	style?: object;
	onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
	rounded,
	circle,
	src,
	size,
	tag: Tag = TagTypes.img,
	className,
	style,
	...restProps
}) => {
	const classes = classNames({ 'rounded-circle': circle, rounded }, className);

	return (
		<Tag
			src={src}
			style={{ width: 'auto', height: size, ...style }}
			className={classes}
			{...restProps}
		/>
	);
};

Avatar.defaultProps = {
	rounded: false,
	circle: true,
	size: 40,
	src: userImage,
	style: {},
};

export default Avatar;
