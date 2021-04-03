import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { RouteComponentProps, withRouter } from 'react-router';

const hasGAId = !!process.env.REACT_APP_GOOGLE_ANALYTICS;

if (hasGAId) {
	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS!);
}

interface GAListenerProps extends RouteComponentProps {}

const GAListener: React.FC<GAListenerProps> = (props) => {
	useEffect(() => {
		if (hasGAId) {
			sendPageView(props.location);
			props.history.listen(sendPageView);
		}
	}, [props.history, props.location]);

	const sendPageView = (location: any) => {
		ReactGA.set({ page: location.pathname });
		ReactGA.pageview(location.pathname);
	};

	return <>{props.children}</>;
};

export default withRouter(GAListener);
