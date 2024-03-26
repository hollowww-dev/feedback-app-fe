import axios from 'axios';

import config from '../utils/config';

import { Entry } from '../types';

const getAll = async (): Promise<Entry[]> => {
	const { data } = await axios.get<Entry[]>(`${config.baseUrl}/feedback`);

	return data;
};

const vote = async (id: string, token: string): Promise<Entry> => {
	const { data } = await axios<Entry>({
		method: 'post',
		url: `${config.baseUrl}/feedback/${id}/vote`,
		headers: { Authorization: `Bearer ${token}` },
	});

	return data;
};

export default { getAll, vote };
