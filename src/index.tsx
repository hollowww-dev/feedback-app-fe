import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Router>
			<App />
		</Router>
	</QueryClientProvider>
);
