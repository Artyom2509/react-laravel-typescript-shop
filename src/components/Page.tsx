import React, { ReactChild, ReactNode } from 'react';
import bn from '../utils/bemnames';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Typography from './Typography';
import { TagTypes } from '../types';

const bem = bn.create('page');

interface IBreadcrumb {
	name: string;
	active: boolean;
}

interface PageProps {
	title: string;
	breadcrumbs?: IBreadcrumb[];
	tag?: TagTypes;
	className?: string;
	children?: ReactChild | JSX.Element[] | ReactNode;
	restProps?: any[];
}

const Page: React.FC<PageProps> = ({
	title = '',
	breadcrumbs,
	tag: Tag = TagTypes.div,
	className,
	children,
	...restProps
}) => {
	const classes = bem.b('px-3', className!);

	return (
		<Tag className={classes} {...restProps}>
			<div
				className={bem.e('header')}
				style={{ display: 'flex', justifyContent: 'space-between' }}>
				{title && typeof title === 'string' ? (
					<Typography type={TagTypes.h1} className={bem.e('title')}>
						{title}
					</Typography>
				) : (
					title
				)}
				{breadcrumbs && (
					<Breadcrumb className={bem.e('breadcrumb')}>
						<BreadcrumbItem>Cabinet</BreadcrumbItem>
						{breadcrumbs.length &&
							breadcrumbs.map(({ name, active }, index) => (
								<BreadcrumbItem key={index} active={active}>
									{name}
								</BreadcrumbItem>
							))}
					</Breadcrumb>
				)}
			</div>
			{children}
		</Tag>
	);
};

export default Page;
