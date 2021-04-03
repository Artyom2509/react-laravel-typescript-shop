import { Box } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
	centered?: boolean;
}

export function TabPanel(props: TabPanelProps) {
	const { children, centered, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<div className={centered ? 'text-center container-fluid' : ''}>{children}</div>
				</Box>
			)}
		</div>
	);
}
