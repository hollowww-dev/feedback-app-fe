import { useContext } from 'react';
import { LoginContextValue, LoginContextType } from '../types';
import LoginContext from './loginContext';

export const useLoggedUser = (): LoginContextValue['user'] => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const state = fullContext.state;

	return state?.user;
};

export const useToken = (): LoginContextValue['token'] | undefined => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const state = fullContext.state;

	return state?.token;
};

export const useLogin = () => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const dispatch = fullContext.dispatch;
	return (payload: LoginContextValue) => {
		dispatch({ type: 'SET', payload });
	};
};

export const useUpdate = () => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const dispatch = fullContext.dispatch;
	return (payload: Omit<LoginContextValue, 'token'> & { token?: string }) => {
		dispatch({ type: 'UPDATE', payload });
	};
};

export const useLogout = () => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const dispatch = fullContext.dispatch;
	return () => {
		dispatch({ type: 'CLEAR' });
	};
};
