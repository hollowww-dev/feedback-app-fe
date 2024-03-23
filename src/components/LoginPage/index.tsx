import { SyntheticEvent, useState } from 'react';

import { Credentials } from '../../types';

import { styled } from 'styled-components';

import loginService from '../../services/loginService';

import { useLogin } from '../../context/loginHooks';
import { useNavigate } from 'react-router';

const LoginContainer = styled.div`
	margin: 1em;
	padding: 1em;
	display: flex;
	flex-direction: column;
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

const LoginPage = () => {
	const [username, setUsername] = useState<Credentials['username']>('');
	const [password, setPassword] = useState<Credentials['password']>('');

	const navigate = useNavigate();

	const saveLogin = useLogin();

	const login = async (e: SyntheticEvent) => {
		e.preventDefault();

		const credentials: Credentials = {
			username: username,
			password: password,
		};

		const response = await loginService.authenticate(credentials);

		saveLogin(response);

		navigate('/');
	};

	return (
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
	);
};

export default LoginPage;
