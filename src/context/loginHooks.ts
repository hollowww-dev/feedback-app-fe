import { useContext } from 'react';
import { LoginContextValue, LoginContextType } from '../types';
import LoginContext from './loginContext';
import { isString } from 'lodash';

export const useLoggedUser = (): LoginContextValue['user'] => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const state = fullContext.state;

	return state?.user;
};

export const useToken = (): LoginContextValue['token'] => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const state = fullContext.state;

	if (!state || !isString(state.token)) {
		throw new Error('Incorrect or missing token');
	}

	return state.token;
};

export const useLogin = () => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const dispatch = fullContext.dispatch;
	return (payload: LoginContextValue) => {
		dispatch({ type: 'SET', payload });
	};
};

export const useLogout = () => {
	const fullContext: LoginContextType = useContext(LoginContext);
	const dispatch = fullContext.dispatch;
	return () => {
		dispatch({ type: 'CLEAR' });
	};
};
