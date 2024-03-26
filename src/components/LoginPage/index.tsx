import { SyntheticEvent, useState } from 'react';

import { Credentials } from '../../types';

import { styled } from 'styled-components';

import loginService from '../../services/loginService';

import { useLogin } from '../../context/loginHooks';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { isAxiosError } from 'axios';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	form {
		padding: 1em;
		display: inline-flex;
		flex-direction: column;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.white};
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
			username,
			password,
		};

		try {
			const response = await loginService.authenticate(credentials);

			saveLogin(response);

			navigate('/');
		} catch (e: unknown) {
			if (isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace('Something went wrong. Error: ', '');
					console.error(message);
					setError(message);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		}
	};

	return (
		<LoginContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
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
			<Link to="/">Back to home</Link>
		</LoginContainer>
	);
};

export default LoginPage;
