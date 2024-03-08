import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './globalStyles';

import { theme } from './theme';

import MediaQuery from 'react-responsive';
import breakpoints from './utils/breakpoints';

import MobileHeader from './components/MobileHeader';

import FeedbackListPage from './components/FeedbackListPage';

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<MediaQuery maxWidth={breakpoints.mobile}>
					<MobileHeader />
				</MediaQuery>
				<Routes>
					<Route path="/" element={<FeedbackListPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</ThemeProvider>
		</>
	);
};

export default App;
