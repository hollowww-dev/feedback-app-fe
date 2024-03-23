import { createContext, useReducer } from 'react';
import { LoginContextValue, LoginContextAction, LoginContextType } from '../types';


const loginReducer = (
	state: LoginContextValue | null,
	action: LoginContextAction
): LoginContextValue | null => {
	switch (action.type) {
		case 'SET':
			return action.payload;
		case 'CLEAR':
			return null;
		default:
			return state;
	}
};

const LoginContext = createContext<LoginContextType>({
	state: null,
	dispatch: () => {},
});

export const LoginContextProvider = ({ children }: { children: JSX.Element }) => {
	const [loginValue, loginDispatch] = useReducer(loginReducer, null);
	const value: LoginContextType = { state: loginValue, dispatch: loginDispatch };
	return (
		<LoginContext.Provider value={value}>{children}</LoginContext.Provider>
	);
};

export default LoginContext;
