import { SyntheticEvent, useState } from 'react';

import { Credentials } from '../../types';

import { styled } from 'styled-components';

import loginService from '../../services/loginService';

import { useLogin } from '../../context/loginHooks';
import { useNavigate } from 'react-router';

const LoginContainer = styled.div`
	margin: 1em;
	padding: 1em;
	display: inline-flex;
	flex-direction: column;
	justify-self: center;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	form {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		label {
			display: flex;
			justify-content: space-between;
		}
	}
`;
const ErrorMessage = styled.div`
	padding: 0.5em 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid red;
	background-color: ${({ theme }) => theme.white};
`;

const LoginPage = () => {
	const [username, setUsername] = useState<Credentials['username']>('');
	const [password, setPassword] = useState<Credentials['password']>('');
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const saveLogin = useLogin();

	const login = async (e: SyntheticEvent) => {
		e.preventDefault();

		const credentials: Credentials = {
			username: username,
			password: password,
		};

		try {
			const response = await loginService.authenticate(credentials);

			saveLogin(response);

			navigate('/');
		} catch (error: unknown) {
			let errorMessage = 'Something went wrong.';
			if (error instanceof Error) {
				errorMessage += ' Error: ' + error.message;
			}
			setError(errorMessage);
		}
	};

	return (
		<>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<LoginContainer>
				<form onSubmit={login}>
					<label htmlFor="username">
						Username:
						<input
							type="text"
							name="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</label>
					<label htmlFor="password">
						Password:
						<input
							type="password"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</label>
					<input type="submit" value="Login" />
				</form>
			</LoginContainer>
		</>
	);
};

export default LoginPage;
