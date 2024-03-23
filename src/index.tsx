import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { LoginContextProvider } from './context/loginContext.tsx';

import App from './App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<LoginContextProvider>
			<Router>
				<App />
			</Router>
		</LoginContextProvider>
	</QueryClientProvider>
);
