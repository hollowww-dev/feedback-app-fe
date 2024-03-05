import { Routes, Route, Navigate } from 'react-router-dom';

import { GlobalStyles } from './globalStyles';

import FeedbackListPage from './components/FeedbackListPage';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<FeedbackListPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
};

export default App;
