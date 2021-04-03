import React, { ReactNode, SyntheticEvent } from 'react';
import { TagTypes } from '../../types';
import bn from '../../utils/bemnames';

const bem = bn.create('content');

interface ContentProps {
	tag?: TagTypes;
	fluid?: boolean | string;
	className?: string;
	children?: ReactNode;
	onClick?: (event?: SyntheticEvent<Element, Event>) => void | ReactNode;
}

const Content: React.FC<ContentProps> = ({
	tag: Tag = TagTypes.div,
	className,
	...restProps
}) => {
	const classes = bem.b(className!);

	return <Tag className={classes} {...restProps} />;
};

export default Content;
