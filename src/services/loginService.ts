import axios from 'axios';

import config from '../utils/config';

import { Credentials } from '../types';

const authenticate = async (object: Credentials) => {
	const { data } = await axios.post<string>(`${config.baseUrl}/login`, object);
	return data;
};

const getUser = async (token: string) => {
	const { data } = await axios({
		method: 'post',
		url: `${config.baseUrl}/login/getuser`,
		headers: { Authorization: `Bearer ${token}` },
	});
	return data;
};

export default { authenticate, getUser };
