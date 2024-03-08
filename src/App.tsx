import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './globalStyles';

import { theme } from './theme';

import { Container } from './components/Container';

import FeedbackListPage from './components/FeedbackListPage';

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Routes>
					<Route
						path="/"
						element={
							<Container>
								<FeedbackListPage />
							</Container>
						}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</ThemeProvider>
		</>
	);
};

export default App;
