import Content from './Content';
import React from 'react';

const EmptyLayout: React.FC = ({ children, ...restProps }) => (
	<main className="cr-app bg-light" {...restProps}>
		<Content fluid="true">{children}</Content>
	</main>
);

export default EmptyLayout;
