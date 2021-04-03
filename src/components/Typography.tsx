import classNames from 'classnames';
import { TagTypes } from '../types';

interface TypographyProps {
	tag?: TagTypes;
	className?: string;
	type?: TagTypes;
	restProps?: any[];
}

const Typography: React.FC<TypographyProps> = ({
	tag: Tag = TagTypes.div,
	className,
	type,
	...restProps
}) => {
	const classes = classNames({ TagTypes: !!type }, className);
	let TypoComp;

	if (Tag) {
		TypoComp = Tag;
	} else if (!Tag) {
		TypoComp = Tag;
	} else {
		TypoComp = TagTypes.p;
	}

	return <TypoComp {...restProps} className={classes} />;
};

Typography.defaultProps = {
	type: TagTypes.p,
};

export default Typography;
