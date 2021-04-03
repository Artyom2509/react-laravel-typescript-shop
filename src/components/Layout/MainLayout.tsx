import { Content, Footer, Header, AdminSidebar } from '.';
import React, { useCallback, useEffect, useRef } from 'react';

interface MainLayoutProps {
	breakpoint: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ breakpoint, children }) => {
	const isSidebarOpen = useRef(
		document
			?.querySelector('.cr-sidebar')
			?.classList.contains('cr-sidebar--open')
	);

	const checkBreakpoint = useCallback((breakpoint?: string) => {
		switch (breakpoint) {
			case 'xs':
			case 'sm':
			case 'md':
				return openSidebar('close');

			case 'lg':
			case 'xl':
			default:
				return openSidebar('open');
		}
	}, []);

	useEffect(() => {
		checkBreakpoint(breakpoint);
	}, [breakpoint, checkBreakpoint]);

	// close sidebar when
	const handleContentClick = () => {
		// close sidebar if sidebar is open and screen size is less than `md`
		if (
			isSidebarOpen.current &&
			(breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md')
		) {
			openSidebar('close');
		}
	};

	const openSidebar = (openOrClose: string) => {
		if (openOrClose === 'open') {
			return document
				?.querySelector('.cr-sidebar')
				?.classList.add('cr-sidebar--open');
		}
		document
			?.querySelector('.cr-sidebar')
			?.classList.remove('cr-sidebar--open');
	};

	return (
		<main className="cr-app bg-light">
			<AdminSidebar />
			<Content fluid="true" onClick={handleContentClick}>
				<Header />
				{children}
				<Footer />
			</Content>
		</main>
	);
};

export default MainLayout;
