import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface BaseProps extends RouteProps {
	component: React.FC;
	layout: React.FC;
}

const LayoutRoute: React.FC<BaseProps> = ({
	component: Component,
	layout: Layout,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props: RouteProps) => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
};

export default React.memo(LayoutRoute);
