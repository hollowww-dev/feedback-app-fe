import axios from 'axios';

import config from '../utils/config';

import { Credentials, LoggedUser } from '../types';

const authenticate = async (object: Credentials) => {
	const { data } = await axios<LoggedUser & { token: string }>({
		method: 'post',
		url: `${config.baseUrl}/login`,
		data: object,
	});
	return data;
};

const getUser = async (token: string) => {
	const { data } = await axios<LoggedUser>({
		method: 'post',
		url: `${config.baseUrl}/login/getuser`,
		headers: { Authorization: `Bearer ${token}` },
	});
	return data;
};

export default { authenticate, getUser };
