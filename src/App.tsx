import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './globalStyles';

import { theme } from './theme';

import FeedbackListPage from './components/FeedbackListPage';

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<FeedbackListPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</ThemeProvider>
		</>
	);
};

export default App;
