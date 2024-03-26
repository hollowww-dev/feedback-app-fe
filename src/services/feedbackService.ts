import axios from 'axios';

import config from '../utils/config';

import { Entry, LoggedUser } from '../types';

const getAll = async (): Promise<Entry[]> => {
	const { data } = await axios.get<Entry[]>(`${config.baseUrl}/feedback`);

	return data;
};

const vote = async (id: string, token: string): Promise<{ entry: Entry; user: LoggedUser }> => {
	const { data } = await axios<{ entry: Entry; user: LoggedUser }>({
		method: 'post',
		url: `${config.baseUrl}/feedback/${id}/vote`,
		headers: { Authorization: `Bearer ${token}` },
	});

	return data;
};

export default { getAll, vote };
